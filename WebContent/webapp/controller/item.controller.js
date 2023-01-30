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
				console.log(oModel);
				that.getView().setModel(oModel);
			});

			this.getOwnerComponent()
				.getRouter()
				.getRoute("item")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			var itemId = oEvent.getParameter("arguments").itemId;
			this.getData(itemId);

			var that = this;
			var serviceURL = that.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

			oModel.read(`/SourcingProjectSet('${projectId}')`, {
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
		},

		getData(itemId) {
			var that = this;
			if (itemId) {
				var oSettingsModel = new sap.ui.model.json.JSONModel();
				oSettingsModel.loadData("model/applicationProperties.json");
				oSettingsModel.attachRequestCompleted(function () {
					that.getView().setModel(this, "Settings");
					var serviceURL = that.getServiceURL();
					var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

					oModel.read(`/MaterialDataSet('${itemId}')`, {
						success: (oData) => {
							console.log(oData)
							var oJson = new sap.ui.model.json.JSONModel(oData);
							that.getView().setModel(oJson, 'materialInfo');
						},
						error: (oError) => {
							console.log(oError);
							var oJson = new sap.ui.model.json.JSONModel({});
							that.getView().setModel(oJson, 'materialInfo');
						},
					});
				});
			}
		},

		onPress: function () {
			var Spid = this.getView().getModel('projectInfo').getProperty('/Spid')
			var Matnr = this.getView().getModel('materialInfo').getProperty('/Matnr')
			console.log(Spid, Matnr)
		},
		onSimulate: function () {
			var supplierTable = this.getView().byId("supplierTable");
			console.log(supplierTable)
			// var oEntry = oItem.getBindingContext("yourODataModel").getObject();
			// var testURL = this
			// 	.getView()
			// 	.getModel("Settings")
			// 	.getProperty("/oTestUrl");
			// var oTestModel = new sap.ui.model.odata.v2.ODataModel(testURL);
			// this.getView().setModel(oTestModel);
			// oTestModel.create("/ProjectSet", {}, {
			// 	success: function (oData, oResponse) {
			// 		console.log(oData)
			// 		sap.m.MessageToast.show("Project successfully created!");
			// 		oTestModel.refresh();
			// 	},
			// 	error: function (oError) {
			// 		sap.m.MessageToast.show("Error during creation");
			// 	},
			// });
		},



		onCreate: function () {
			var testURL = this
				.getView()
				.getModel("Settings")
				.getProperty("/oTestUrl");
			var oTestModel = new sap.ui.model.odata.v2.ODataModel(testURL);
			this.getView().setModel(oTestModel);
			oTestModel.create("/ProjectSet", {}, {
				success: function (oData, oResponse) {
					console.log(oData)
					sap.m.MessageToast.show("Project successfully created!");
					oTestModel.refresh();
				},
				error: function (oError) {
					sap.m.MessageToast.show("Error during creation");
				},
			});
		},
		onOverflowToolbarPress: function () {
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

		// colorRows : function(oTable) {

		//     var sPath = oTable.getBinding("items").getPath(); //path to table's data
		//     var oModel = this.getView().getModel(); //model which is bound to the table
		//     //or var oModel = oTable.getModel(); if the model is bound directly to the table
		//     var aData = oModel.getProperty(sPath);//array of rows
		//     var rowCount = aData.length; 
		//     var currentRowContext;
		//     for (var i = 0; i < rowCount; i++) {
		//         currentRowContext = aData[i]; 
		//     }
		// }
		onTableUpdateFinished: function (oEvent) {
			var oTable = oEvent.getSource();
			console.log(oTable.getItems())
			var oModel = oTable.getModel();
			console.log(oModel)
			var oData = oModel.getData();
			console.log(oData)
			var sPath = oTable.getBinding("items").getPath(); //path to table's data
			// console.log(sPath)
			var aData = oModel.getProperty(sPath);//array of rows
			console.log(oTable.getAggregation("items"))
			console.log(oTable.getBinding("items"))
			console.log(aData)
			var that = this
			for (var i = 0; i < oTable.getItems().length; i++){
				
				// setTimeout(()=> {
					// console.log(i)
					var oProperty = that.getView().getModel().getProperty(oTable.getItems()[i].getBindingContext().getPath());
					console.log(oProperty)
					const d = new Date();
					let ms = d.valueOf();
					console.log(ms)
				// }, 1000)
			}

			var oHeaderbar = oTable.getAggregation("headerToolbar");
			if (oHeaderbar && oHeaderbar.getAggregation("content")[1]) {
				var oTitle = oHeaderbar.getAggregation("content")[1];

				if (oTable.getBinding("items") && oTable.getBinding("items").isLengthFinal()) {
					oTitle.setText("(" + oTable.getBinding("items").getLength() + ")");
				} else {
					oTitle.setText("(0)");
				}
			}


			var oModel = this.getView().getModel(); //model which is bound to the table

			// oModel = this.getOwnerComponent().getModel() 
			console.log(oModel)
			// oModel = oTable.getModel(); //if the model is bound directly to the table
			// console.log(oModel)
			var aData = oModel.getProperty(sPath);//array of rows
			console.log(aData)
			var rowCount = aData.length;
			var currentRowContext;
			for (var i = 0; i < rowCount; i++) {
				currentRowContext = aData[i];
				console.log(currentRowContext)
			}
		},
	});
});

