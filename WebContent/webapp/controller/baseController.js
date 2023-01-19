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

		onNavHome: function (oEvent) {
			console.log("history length", history.length)
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			console.log("previousHash-------", sPreviousHash)
			this.getRouter().navTo("home", {}, true /*no history*/);
			console.log("previousHash???", sPreviousHash === undefined)
			if (sPreviousHash === undefined) {
				window.location.reload(true)
			}
		},

		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			console.log("previousHash-------", sPreviousHash)
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /*no history*/);
				window.location.reload(true);
			}
		},

		getServiceURL: function () {
			return this.getView().getModel("Settings").getProperty("/oDataUrl");
		},

	});

});
