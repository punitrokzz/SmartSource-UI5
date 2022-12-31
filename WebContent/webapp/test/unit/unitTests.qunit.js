/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"smart_source_app/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
