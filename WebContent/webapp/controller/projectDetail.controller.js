sap.ui.define([
	"./BaseController"
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

			oView.bindElement({
				path: sPath,
				parameters: { '$expand': 'SourceToMaterial,SourceToSps' }
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
