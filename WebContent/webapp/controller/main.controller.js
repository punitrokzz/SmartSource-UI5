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
				// oModel.read('/SupplierInfoDataSet', {
				// 	success: (oData) => {
				// 		let news = [];
				// 		const suppliers = oData.results;
				// 		suppliers.forEach(({ Snews }) => {
				// 			let snews = JSON.parse(Snews);
				// 		});
				// 		var oJson = new sap.ui.model.json.JSONModel(oData.results);
				// 		that.getView().setModel(oJson, 'news');
				// 	},
				// 	error: (oError) => {
				// 		console.log(oError);
				// 	},
				// });
			});
		},

		onNavigate: function (projectId) {
			this.getRouter().navTo("projectDetail", { projectId });
		},

	});

});
