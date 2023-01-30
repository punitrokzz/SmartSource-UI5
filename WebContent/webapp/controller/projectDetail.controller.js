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
			var oView = this.getView();

			var sIdPrefix = oView.getId().split("---")[0];
			console.log(sIdPrefix)


			// this.getView().addDelegate({
			// 	onBeforeShow: function (evt) {
			// 		//ToDo
			// 	}
			// });
			// console.log(sap.ui.getCore().byId(sIdPrefix + "---main").getModel())
			// console.log(sap.ui.getCore().byId(sIdPrefix + "---main--projectList").getModel())
			// console.log(sap.ui.getCore().byId(sIdPrefix + "---main--projectList").getModel().getData())
			// console.log(sap.ui.getCore().byId(sIdPrefix + "---main--projectList").getBinding("items"))
			// var oArray = sap.ui
			// 	.getCore()
			// 	.byId(sIdPrefix + "---projectList")
			// 	.getModel()
			// 	.getData().Project;

			// console.log(oArray)
			// function matchById(obj) {
			// 	return obj.Id === projectId;
			// }
			// var index = oArray.findIndex(matchById);
			// oView.bindElement("/Flight/" + index);
			var that = this;
			var serviceURL = that.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			// that.getView().setModel(oModel);
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
		// },


		onNavigateItem: function (itemId) {

			// var context = oEvent.getSource().getBindingContext();
			console.log(itemId)
			this.getRouter().navTo("item", { projectId: this.projectId, itemId });
			// this.getRouter().navTo("flights", {
			// 		flightId: context.getProperty("flightId")
			// })
			// console.log("???", supplierId)
			// console.log(this.getView().getModel('projectInfo').getProperty('/Id'))
			// this.getRouter().navTo("supplier", { projectId: this.projectId, supplierId });
		},
		onNavigateSupplier: function (supplierId) {
			// console.log("???", supplierId)
			console.log(this.getView().getModel('projectInfo').getProperty('/Id'))
			this.getRouter().navTo("supplier", { projectId: this.projectId, supplierId });
		},
	});

});
