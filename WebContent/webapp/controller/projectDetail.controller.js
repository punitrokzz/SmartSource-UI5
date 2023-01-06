sap.ui.define([
	"smartsourceapp/controller/BaseController"
], function (Controller) {
	"use strict";

	return Controller.extend("smartsourceapp.controller.main", {

		onInit: function () {
			console.log("id:", this.getView().getId())
			var that = this;
			var oSettingsModel = new sap.ui.model.json.JSONModel();
			oSettingsModel.loadData("model/applicationProperties.json");
			oSettingsModel.attachRequestCompleted(function () {
				that.getView().setModel(this, "Settings");
				var serviceURL = that.getServiceURL();
				console.log(serviceURL);
				var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
				console.log(oModel);
				that.getView().setModel(oModel);
			});

			this.getOwnerComponent()
				.getRouter()
				.getRoute("projectDetail")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			this.projectId = projectId;
		},

		onNavigate: function (supplierId) {
			this.getRouter().navTo("supplier", { projectId: this.projectId, supplierId });
		},
	});

});
