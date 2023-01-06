sap.ui.define([
	"smartsourceapp/controller/BaseController",
	"./simulationDialog"
], function (Controller, Dialog) {
	"use strict";

	return Controller.extend("smartsourceapp.controller.main", {

		onInit: function () {
			this.getOwnerComponent()
				.getRouter()
				.getRoute("supplier")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var supplierId = oEvent.getParameter("arguments").supplierId;
			this.getData(supplierId);
		},

		getData(supplierId) {
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
							that.getView().setModel(oJson, 'supplierInfo');
						},
						error: (oError) => {
							console.log(oError);
						},
					});

					oModel.read(`/SupplierDataSet('${supplierId}')`, {
						success: (oData) => {
							var oJson = new sap.ui.model.json.JSONModel(oData);
							that.getView().setModel(oJson, 'supplier');
						},
						error: (oError) => {
							console.log(oError);
						},
					});
				});
			}
		},

		onOverflowToolbarPress : function () {
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
			// console.log("context", context)
			oDialog._oControl.setBindingContext(context);
			oDialog.open();
		},
	});

});
