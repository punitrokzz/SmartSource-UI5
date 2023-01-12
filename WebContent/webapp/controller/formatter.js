sap.ui.define([
	// "sap/ui/core/format/NumberFormat",
	// "./utilities"
], function () {
	"use strict";

	return {
		textFormatter: function (str) {
			var words = str.toLowerCase().split(" ");
			for (var i in words) {
				words[i] = words[i][0].toUpperCase() + words[i].slice(1);
			}
			return words.join(" ");
		}
	};
});
