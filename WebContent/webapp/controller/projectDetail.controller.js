sap.ui.define([
	"smartsourceapp/controller/BaseController"
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
				.getRoute("projectDetail")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			var oView = this.getView();
			var sPath = `/SourcingProjectSet('${projectId}')`
			// var sPath = `/SourcingProjectSet('${projectId}')?$expand=SourceToSps`
			// oView.bindElement(sPath);
			oView.bindElement({
				path: sPath,
				parameters: { '$expand': 'SourceToMaterial,SourceToSps' }
			});

			var serviceURL = this.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			oModel.read(sPath, {
				urlParameters: { '$expand': 'SourceToSps,SourceToMaterial' },
				success: (oData) => {
					console.log(oData)
					console.log(oData.SourceToSps)
					console.log(oData.SourceToMaterial)
				},
				error: (oError) => {
					console.log(oError);
				},
			});
			oModel.read(`/MaterialDataSet`, {
				success: (oData) => {
					console.log(oData)
				},
				error: (oError) => {
					console.log(oError);
				},
			});
		},

		onNavigateItem: function (itemId) {
			var projectId = this.getView().getBindingContext().getProperty('Spid')
			this.getRouter().navTo("item", { projectId, itemId });
		},

		onNavigateSupplier: function (supplierId) {
			var projectId = this.getView().getBindingContext().getProperty('Spid')
			this.getRouter().navTo("supplier", { projectId, supplierId });
		},
	});

});
