sap.ui.define([
	// "sap/ui/core/format/NumberFormat",
	// "./utilities"
], function () {
	"use strict";

	return {
		textFormatter: function (str) {
			try {
				var words = str.toLowerCase().split(" ");
				for (var i in words) {
					words[i] = words[i][0].toUpperCase() + words[i].slice(1);
				}
				return words.join(" ");
			} catch (error) {
				console.log(error)
				return str
			}
		},
		dateFormatter: function (str) {
			// console.log(str)
			var date = new Date(str);
			// print the date
			// console.log(date);
			// console.log(date.toGMTString());

			// var d = Date.parse(str);
			// print the date
			// console.log(d);
			// var words = str.toLowerCase().split(" ");
			// for (var i in words) {
			// 	words[i] = words[i][0].toUpperCase() + words[i].slice(1);
			// }
			return date.toDateString();
		}
	};
});
