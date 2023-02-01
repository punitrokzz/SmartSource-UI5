sap.ui.define([
	// "sap/ui/core/format/NumberFormat",
], function () {
	"use strict";

	return {
		textFormat: function (str) {
			try {
				var words = str.toLowerCase().split(" ");
				for (var i in words) {
					words[i] = words[i][0].toUpperCase() + words[i].slice(1);
				}
				return words.join(" ");
			} catch (error) {
				return str
			}
		},

		dateFormat: function (str) {
			try {
				var date = new Date(str);
				var dateString = date.toDateString();
				return dateString;
			} catch (error) {
				return str
			}
		}
	};
});
