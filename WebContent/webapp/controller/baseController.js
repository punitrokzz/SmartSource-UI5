sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"./formatter",
	"./utilities",

], function (Controller, History, formatter, utilities) {
	"use strict";

	return Controller.extend("smartsourceapp.controller.BaseController", {

		formatter,

		utilities,

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavHome: function () {
			this.getRouter().navTo("home", {}, true /*no history*/);
		},

		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.onNavHome();
			}
		},

		getServiceURL: function () {
			return this.getView().getModel("Settings").getProperty("/oDataUrl");
		},

	});

});
