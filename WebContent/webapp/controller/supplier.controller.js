sap.ui.define([
	"smartsourceapp/controller/BaseController",
	"./simulationDialog",

], function (Controller, Dialog) {
	"use strict";

	return Controller.extend("smartsourceapp.controller.main", {

		onInit: function () {
			var that = this;
			var oSettingsModel = new sap.ui.model.json.JSONModel();
			oSettingsModel.loadData("model/applicationProperties.json");
			oSettingsModel.attachRequestCompleted(function () {
				that.getView().setModel(this, "Settings");
				var serviceURL = that.getServiceURL();
				var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
				that.getView().setModel(oModel);
			});
			this.getOwnerComponent()
				.getRouter()
				.getRoute("supplier")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			var supplierId = oEvent.getParameter("arguments").supplierId;

			var oView = this.getView();
			oView.bindElement(`/SupplierDataSet('${supplierId}')`);

			this.getData(supplierId);

			var testURL = this
				.getView()
				.getModel("Settings")
				.getProperty("/oTestUrl");
			console.log("testURL", testURL)
			var oTestModel = new sap.ui.model.odata.v2.ODataModel(testURL);
			this.getView().setModel(oTestModel);

			var that = this;
		
			oTestModel.read(`/ProjectSet('${projectId}')`, {
				success: (oData) => {
					console.log(oData)
					var oJson = new sap.ui.model.json.JSONModel(oData);
					// var oJson = new sap.ui.model.json.JSONModel({});
					that.getView().setModel(oJson, 'projectInfo');
				},
				error: (oError) => {
					console.log(oError);
				},
			});

			
			var that = this;
			var serviceURL = that.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

			oModel.read(`/SourcingProjectSet('${projectId}')`, {
				urlParameters: { '$expand': 'SourceToMaterial' },
				success: (oData) => {
					// console.log(oData)
					console.log(oData.SourceToSps)
					console.log(oData.SourceToSps.results)
					// console.log(oData.SourceToMaterial)
					var oJson = new sap.ui.model.json.JSONModel(oData.SourceToMaterial.results);
					that.getView().setModel(oJson, 'items');
				},
				error: (oError) => {
					console.log(oError);
				},
			});

		},

		getData(supplierId) {
			console.log( this.getView().getBindingContext())
			var that = this;
			if (supplierId) {
				var oSettingsModel = new sap.ui.model.json.JSONModel();
				oSettingsModel.loadData("model/applicationProperties.json");
				oSettingsModel.attachRequestCompleted(function () {
					that.getView().setModel(this, "Settings");
					var serviceURL = that.getServiceURL();
					var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

					oModel.read(`/SupplierInfoDataSet('${supplierId}')`, {
						success: (oData) => {
							const pTrend = oData['Ptrend'].split("-");
							oData['Ptrend'] = {
								2021: parseFloat(pTrend[0]),
								2020: parseFloat(pTrend[1]),
								2019: parseFloat(pTrend[2]),
								2018: parseFloat(pTrend[3]),
								2017: parseFloat(pTrend[4]),
							}
							var oJson = new sap.ui.model.json.JSONModel(oData);
							// var oJson = new sap.ui.model.json.JSONModel({});

							that.getView().setModel(oJson, 'supplierInfo');

							let news = [];
							// suppliers.forEach(({ Name1, Snews }) => {
							let snews = JSON.parse(oData['Snews']);
							// console.log(snews)
							snews.supplier = oData.Name1
							snews.highlight = snews.highlight.replace(/<\/?b>/g, "");
							news.push(snews)

							// });
							var oJson = new sap.ui.model.json.JSONModel(news);
							// var oJson = new sap.ui.model.json.JSONModel({});

							that.getView().setModel(oJson, 'news');

						},
						error: (oError) => {
							console.log(oError);
							var oJson = new sap.ui.model.json.JSONModel({});
							that.getView().setModel(oJson, 'supplierInfo');
							// var oJson = new sap.ui.model.json.JSONModel({});
							that.getView().setModel(oJson, 'news');
						},
					});

					oModel.read(`/SupplierDataSet('${supplierId}')`, {
						success: (oData) => {
							console.log(oData)
						},
						error: (oError) => {
							console.log(oError);
						},
					});
				});
			}
		},

		onOverflowToolbarPress: function () {
			console.log( this.getView().getBindingContext())
			var oPanel = this.byId("expandablePanel");
			oPanel.setExpanded(!oPanel.getExpanded());
		},
		_onButtonPress: function (oEvent) {

			var sDialogName = "simulationDialog";
			this.mDialogs = this.mDialogs || {};
			// var oDialog = this.mDialogs[sDialogName];
			// console.log("this.mDialogs", this.mDialogs, oDialog)
			// if (!oDialog) {
			// 	oDialog = new Dialog(this.getView());
			// 	this.mDialogs[sDialogName] = oDialog;
			// 	// For navigation.
			// 	oDialog.setRouter(this.oRouter);
			// }
			var oDialog = new Dialog(this.getView());
			// console.log("this.mDialogs", this.mDialogs, oDialog)
			var context = oEvent.getSource().getBindingContext();
			console.log("context", context)
			oDialog._oControl.setBindingContext(context);
			oDialog.open();
		},

	});

});
