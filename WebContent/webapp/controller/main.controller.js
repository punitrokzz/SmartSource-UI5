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

				oModel.read('/SupplierInfoDataSet', {
					success: (oData) => {
						let news = [];
						const suppliers = oData.results;
						suppliers.forEach(({ Name1, Snews }) => {
							let snews = JSON.parse(Snews);
							snews.supplier = Name1
							snews.highlight = snews.highlight.replace(/<\/?b>/g, "");
							news.push(snews)
						});
						var oJson = new sap.ui.model.json.JSONModel(news);
						that.getView().setModel(oJson, 'news');
					},
					error: (oError) => {
						console.log(oError);
					},
				});

				// var testURL = that
				// 	.getView()
				// 	.getModel("Settings")
				// 	.getProperty("/oTestUrl");
				// console.log(testURL)

				// var oTestModel = new sap.ui.model.odata.v2.ODataModel(testURL);
				// that.getView().setModel(oTestModel);
				// oTestModel.read('/ProjectSet', {
				// 	success: (oData) => {
				// 		console.log(oData)
				// 	},
				// 	error: (oError) => {
				// 		console.log(oError);
				// 	},
				// });
			// var newURL = that
			// 		.getView()
			// 		.getModel("Settings")
			// 		.getProperty("/oNewUrl");
			// 	console.log(newURL)

			// 	var oNewModel = new sap.ui.model.odata.v2.ODataModel(newURL);
			// 	oNewModel.read('/QuotationSet', {
			// 		success: (oData) => {
			// 			console.log(oData)
			// 		},
			// 		error: (oError) => {
			// 			console.log(oError);
			// 		},
			// 	});
			// 	oNewModel.read('/MaterialSet', {
			// 		success: (oData) => {
			// 			console.log(oData)
			// 		},
			// 		error: (oError) => {
			// 			console.log(oError);
			// 		},
			// 	});
			});
		},
	
		onNavigate: function (projectId) {
			this.getRouter().navTo("projectDetail", { projectId });
		},

	});

});
