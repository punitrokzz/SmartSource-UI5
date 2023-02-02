sap.ui.define([
	"./BaseController",
], function (Controller) {
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
				.getRoute("item")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			var itemId = oEvent.getParameter("arguments").itemId;
			var oView = this.getView();
			oView.bindElement(`/MaterialDataSet('${itemId}')`);

			var that = this;
			var serviceURL = that.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

			oModel.read(`/SourcingProjectSet('${projectId}')`, {
				success: (oData) => {
					var oJson = new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(oJson, 'projectInfo');
				},
				error: (oError) => {
					console.log(oError);
				},
			});
			this.filterMaterial(oModel, projectId, itemId);
			var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
				plotArea: {
					dataLabel: {
						visible: true
					}
				},
				title: {
					visible: false,
				}
			});
		},

		filterMaterial: function (oModel, Spid, Matnr) {
			oModel.read("/FilterMaterial", {
				urlParameters: {
					"Spid": `'${Spid}'`,
					"Matnr": `'${Matnr}'`,
				},
				success: (oData) => {
					var oJson = new sap.ui.model.json.JSONModel(oData.results);
					this.getView().setModel(oJson, 'suppliers');
				},
				error: (oError) => {
					console.log(oError);
				},
			});
		},
		onSimulate: function () {
			var Spid = this.getView().getModel('projectInfo').getProperty('/Spid')
			var Matnr = this.getView().getBindingContext().getProperty('Matnr')
			var oModel = this.getView().getModel()
			var that = this
			oModel.read("/OptimalPriceEstimate", {
				urlParameters: {
					"Spid": `'${Spid}'`,
					"Matnr": `'${Matnr}'`,
				},
				success: (oData) => {
					that.filterMaterial(oModel, Spid, Matnr)
				},
				error: (oError) => {
					console.log(oError);
				},
			});
		},


		onNavigateSupplier: function (supplierId) {
			var projectId = this.getView().getModel('projectInfo').getProperty('/Spid')
			this.getRouter().navTo("supplier", { projectId, supplierId });
		},

		onNavigateProject: function () {
			var projectId = this.getView().getModel('projectInfo').getProperty('/Spid')
			this.getRouter().navTo("projectDetail", { projectId });
		},
	});
});
