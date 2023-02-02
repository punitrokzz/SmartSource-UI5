sap.ui.define([
	"./BaseController",
	"./news",
], function (Controller, News) {
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
						suppliers.forEach(supplier => {
							News.getSupplierNews(supplier).forEach (item => news.push(item))
						})
						var oJson = new sap.ui.model.json.JSONModel(news);
						that.getView().setModel(oJson, 'news');
						var oNews = new sap.ui.model.json.JSONModel({
							"SelectedSentiment": "All",
							"News": news,
							"FilteredResults": news,
						});
						that.getView().setModel(oNews, 'oNews');
					},
					error: (oError) => {
						console.log(oError);
					},
				});
			});
		},

		onNavigate: function (projectId) {
			this.getRouter().navTo("projectDetail", { projectId });
		},

		onNewsFilter: function () {
			var oModel = this.getView().getModel('oNews')
			var selectedSentiment = oModel.getProperty("/SelectedSentiment")
			var news = oModel.getProperty("/News")
			var results = selectedSentiment === 'All' ? news : news.filter(({ sentiment }) => sentiment === selectedSentiment);
			oModel.setProperty("/FilteredResults", results);
		},
	});

});
