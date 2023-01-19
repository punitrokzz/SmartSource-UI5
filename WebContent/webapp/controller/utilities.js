sap.ui.define([
	"./utilities"
], function () {
	"use strict";

	return {
		getHostname: function (url) {
			try {
				const { hostname } = new URL(url);
				const str = hostname.split('.');
				if (str.length && str[0] === 'www') {
					return hostname.substring(4);
				}
				return hostname;
			} catch {
				return '';
			}
		},
		getTitle: function (url) {
			try {
				const { pathname } = new URL(url);
				var words = pathname.split('.')[0].toLowerCase().split(/-|\//g);
				for (var i in words) {
					if (words[i].length)
						words[i] = words[i][0].toUpperCase() + words[i].slice(1);
				}
				return words.join(" ");
			} catch {
				return 'News Title';
			}
		}
	}
});
