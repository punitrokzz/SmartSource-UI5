sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"./formatter",

], function (Controller, History, formatter) {
	"use strict";

	return Controller.extend("smartsourceapp.controller.BaseController", {

		formatter,
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavHome: function (oEvent) {
			console.log("history length", history.length)
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
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

		onTableUpdateFinished: function (oEvent) {
			var oTable = oEvent.getSource();
			var oHeaderbar = oTable.getAggregation("headerToolbar");
			if (oHeaderbar && oHeaderbar.getAggregation("content")[1]) {
				var oTitle = oHeaderbar.getAggregation("content")[1];
				if (oTable.getBinding("items") && oTable.getBinding("items").isLengthFinal()) {
					oTitle.setText("(" + oTable.getBinding("items").getLength() + ")");
				} else {
					oTitle.setText("");
				}
			}
		},
	});

});
