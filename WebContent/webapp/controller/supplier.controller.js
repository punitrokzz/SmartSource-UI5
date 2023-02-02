sap.ui.define([
	"smartsourceapp/controller/BaseController",
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

			oModel.read("/FilterSupplier", {
				urlParameters: {
					"Spid": `'${projectId}'`,
					"Snr": `'${supplierId}'`,
				},
				success: (oData) => {
					var oJson = new sap.ui.model.json.JSONModel(oData.results);
					that.getView().setModel(oJson, 'items');
				},
				error: (oError) => {
					console.log(oError);
				},
			});

			oModel.read(`/SupplierInfoDataSet('${supplierId}')`, {
				success: (oData) => {
					var pTrend = oData['Ptrend'].split("*");
					oData['Ptrend'] = {
						2021: parseFloat(pTrend[0]),
						2020: parseFloat(pTrend[1]),
						2019: parseFloat(pTrend[2]),
						2018: parseFloat(pTrend[3]),
						2017: parseFloat(pTrend[4]),
					}
					var oJson = new sap.ui.model.json.JSONModel(oData);

					that.getView().setModel(oJson, 'supplierInfo');

					var news = News.getSupplierNews(oData);

					var oNews = new sap.ui.model.json.JSONModel({
						"SelectedSentiment": "All",
						"News": news,
						"FilteredResults": news,
					});
					that.getView().setModel(oNews, 'oNews');
				},
				error: (oError) => {
					console.log(oError);
					var oJson = new sap.ui.model.json.JSONModel({});
					that.getView().setModel(oJson, 'supplierInfo');
				},
			});

		},

		onNavigateProject: function () {
			var projectId = this.getView().getModel('projectInfo').getProperty('/Spid')
			this.getRouter().navTo("projectDetail", { projectId });
		},
		onNavigateItem: function (itemId) {
			var projectId = this.getView().getModel('projectInfo').getProperty('/Spid')
			this.getRouter().navTo("item", { projectId, itemId });
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
