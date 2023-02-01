sap.ui.define([
	"./BaseController",
	"./simulationDialog",

], function (Controller, Dialog) {
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
				.getRoute("item")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var projectId = oEvent.getParameter("arguments").projectId;
			var itemId = oEvent.getParameter("arguments").itemId;
			var oView = this.getView();
			oView.bindElement(`/MaterialDataSet('${itemId}')`);

			var that = this;
			var serviceURL = that.getServiceURL();
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);

			oModel.read(`/SourcingProjectSet('${projectId}')`, {
				urlParameters: { '$expand': 'SourceToSps' },
				success: (oData) => {
					// console.log(oData)
					console.log(oData.SourceToSps)
					console.log(oData.SourceToSps.results)
					// console.log(oData.SourceToMaterial)
					var oJson = new sap.ui.model.json.JSONModel(oData.SourceToSps.results);
					that.getView().setModel(oJson, 'supp');
				},
				error: (oError) => {
					console.log(oError);
				},
			});




			oModel.read(`/MaterialDataSet('${itemId}')`, {
				success: (oData) => {
					console.log("item", oData)
					var oJson = new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(oJson, 'materialInfo');
				},
				error: (oError) => {
					console.log(oError);
					var oJson = new sap.ui.model.json.JSONModel({});
					that.getView().setModel(oJson, 'materialInfo');
				},
			});

			oModel.read(`/SourcingProjectSet('${projectId}')`, {
				success: (oData) => {
					console.log("project", oData)
					var oJson = new sap.ui.model.json.JSONModel(oData);
					// var oJson = new sap.ui.model.json.JSONModel({});
					that.getView().setModel(oJson, 'projectInfo');
				},
				error: (oError) => {
					console.log(oError);
				},
			});
			console.log("QuotationDataSet")
			oModel.read("/QuotationDataSet", {
				success: (oData) => {
					console.log(oData)
					// var oJson = new sap.ui.model.json.JSONModel(oData);
					// var oJson = new sap.ui.model.json.JSONModel({});
					// that.getView().setModel(oJson, 'projectInfo');
				},
				error: (oError) => {
					console.log(oError);
				},
			});

		},

		onPress: async function () {
			// this.getView().getModel('supp')
			console.log(this.getView().getModel('supp'))
			console.log(this.getView().getModel('supp').getData())

			var Spid = this.getView().getModel('projectInfo').getProperty('/Spid')
			var Matnr = this.getView().getModel('materialInfo').getProperty('/Matnr')
			var stprs = this.getView().getModel('materialInfo').getProperty('/Stprs')
			var minPrs = stprs - stprs * 0.05;
			var maxPrs = stprs + stprs * 0.15;
			var randomPrs = Math.random() * (maxPrs - minPrs) + minPrs;
			var Ofp = Math.floor(randomPrs)
			var Qaid = new Date().valueOf().toString() + '-1';
			var oModel = this.getView().getModel()
			// console.log(Spid, Matnr, Qaid, Ofp)

			// oModel.create("/QuotationDataSet", {
			// 	Qaid, Spid, Matnr, Ofp
			// }, {
			// 	success: function (oData, oResponse) {
			// 		console.log(oData)
			// 		oModel.refresh();
			// 	},
			// 	error: function (oError) {
			// 	},
			// });
			var oTable = this.getView().byId("supplierTable");
			// console.log(oTable)
			// console.log(oTable.getItems())
			console.log(oTable.getItems()[0])
			// console.log(oTable.getItems()[0].getBindingContext())
			// console.log(oTable.getItems()[0].getBindingContext().getProperty('/Snr'))
			// for (var i = 0; i < oTable.getItems().length; i++) {

			// 	var sPath = oTable.getItems()[i].getBindingContext().getPath()
			// 	var Snr = this.getView().getModel().getProperty(sPath + '/Snr')


			// 	var Qaid = new Date().valueOf() + '-' + i
			// 	var randomPrs = Math.random() * (maxPrs - minPrs) + minPrs;
			// 	var Ofp = Math.floor(randomPrs)
			// 	// console.log({ Qaid, Rnr: 1, Snr, Matnr, Spid, Ofp })
			// 	await new Promise((resolve, reject) =>
			// 		oModel.create("/QuotationDataSet", { Qaid, Rnr: '1', Snr, Matnr, Spid, Ofp }, {
			// 			success: function (oData, oResponse) {
			// 				console.log(oData)
			// 				resolve(oData)
			// 			},
			// 			error: function (oError) {
			// 				reject(oError)
			// 			},
			// 		})
			// 	)
			// }

			console.log("finish!!!")


			// var oPromises = [];
			// for (var i = 0; i < oTable.getItems().length; i++) {

			// 	var sPath = oTable.getItems()[i].getBindingContext().getPath()
			// 	var Snr = this.getView().getModel().getProperty(sPath + '/Snr')
			// 	var Qaid = new Date().valueOf() + '-' + i
			// 	var randomPrs = Math.random() * (maxPrs - minPrs) + minPrs;
			// 	var Ofp = Math.floor(randomPrs)
			// 	// console.log({ Qaid, Rnr: 1, Snr, Matnr, Spid, Ofp })
			// 	oPromises.push(
			// 		new Promise((resolve, reject) =>
			// 			oModel.create("/QuotationDataSet", { Qaid, Rnr: 1, Snr, Matnr, Spid, Ofp }, {
			// 				success: function (oData, oResponse) {
			// 					resolve(oData)
			// 				},
			// 				error: function (oError) {
			// 					reject(oError)
			// 				},
			// 			})
			// 		)
			// 	)
			// }
			// Promise.all(oPromises)
			// 	.then(() => { console.log("success"); oModel.refresh(); })
			// 	.catch(error => {
			// 		console.log(error);
			// 		sap.m.MessageToast.show("Error during update quotations");
			// 	});
		},
		onSimulate: function () {
			var supplierTable = this.getView().byId("supplierTable");
			console.log(supplierTable)
			var oModel = this.getView().getModel()
			oModel.read("/OptimalPriceEstimate", {
				urlParameters: {
					"Spid": "'1000000104'",
					"Matnr": "'M00001'"
				},
				success: (oData) => {
					console.log(oData)
					// var oJson = new sap.ui.model.json.JSONModel(oData);
					// var oJson = new sap.ui.model.json.JSONModel({});
					// that.getView().setModel(oJson, 'projectInfo');
				},
				error: (oError) => {
					console.log(oError);
				},
			});
			// var oEntry = oItem.getBindingContext("yourODataModel").getObject();
			// var testURL = this
			// 	.getView()
			// 	.getModel("Settings")
			// 	.getProperty("/oTestUrl");
			// var oTestModel = new sap.ui.model.odata.v2.ODataModel(testURL);
			// this.getView().setModel(oTestModel);
			// oTestModel.create("/ProjectSet", {}, {
			// 	success: function (oData, oResponse) {
			// 		console.log(oData)
			// 		sap.m.MessageToast.show("Project successfully created!");
			// 		oTestModel.refresh();
			// 	},
			// 	error: function (oError) {
			// 		sap.m.MessageToast.show("Error during creation");
			// 	},
			// });
		},
		onUpdate: function () {
			var oTable = this.getView().byId("supplierTable");
			console.log(oTable)
			var oTable = oEvent.getSource();
			console.log(oTable.getItems())
			var oModel = oTable.getModel();
			console.log(oModel)
			var oData = oModel.getData();
			console.log(oData)
			var sPath = oTable.getBinding("items").getPath(); //path to table's data
			// console.log(sPath)
			var aData = oModel.getProperty(sPath);//array of rows
			console.log(oTable.getAggregation("items"))
			console.log(oTable.getBinding("items"))
			console.log(aData)
			var that = this
			for (var i = 0; i < oTable.getItems().length; i++) {

				// setTimeout(()=> {
				// console.log(i)
				var oProperty = that.getView().getModel().getProperty(oTable.getItems()[i].getBindingContext().getPath());
				console.log(oProperty)
				const d = new Date();
				let ms = d.valueOf();
				console.log(ms)
				// }, 1000)
			}

			var oHeaderbar = oTable.getAggregation("headerToolbar");
			if (oHeaderbar && oHeaderbar.getAggregation("content")[1]) {
				var oTitle = oHeaderbar.getAggregation("content")[1];

				if (oTable.getBinding("items") && oTable.getBinding("items").isLengthFinal()) {
					oTitle.setText("(" + oTable.getBinding("items").getLength() + ")");
				} else {
					oTitle.setText("(0)");
				}
			}
			var oModel = this.getView().getModel(); //model which is bound to the table

			// oModel = this.getOwnerComponent().getModel() 
			console.log(oModel)
			// oModel = oTable.getModel(); //if the model is bound directly to the table
			// console.log(oModel)
			var aData = oModel.getProperty(sPath);//array of rows
			console.log(aData)
			// var rowCount = aData.length;
			// var currentRowContext;
			// for (var i = 0; i < rowCount; i++) {
			// 	currentRowContext = aData[i];
			// 	console.log(currentRowContext)
			// }
	
		},


		onOverflowToolbarPress: function () {
			var oPanel = this.byId("expandablePanel");
			oPanel.setExpanded(!oPanel.getExpanded());
		},
		_onButtonPress: function (oEvent) {
			var sDialogName = "simulationDialog";
			this.mDialogs = this.mDialogs || {};
			// var oDialog = this.mDialogs[sDialogName];
			// console.log("this.mDialogs", this.mDialogs, oDialog)
			// if (!oDialog) {
			// 	oDialog = new Dialog(this.getView());
			// 	this.mDialogs[sDialogName] = oDialog;
			// 	// For navigation.
			// 	oDialog.setRouter(this.oRouter);
			// }
			var oDialog = new Dialog(this.getView());
			// console.log("this.mDialogs", this.mDialogs, oDialog)
			var context = oEvent.getSource().getBindingContext();
			console.log("context", context)
			oDialog._oControl.setBindingContext(context);
			oDialog.open();
		},

		// colorRows : function(oTable) {

		//     var sPath = oTable.getBinding("items").getPath(); //path to table's data
		//     var oModel = this.getView().getModel(); //model which is bound to the table
		//     //or var oModel = oTable.getModel(); if the model is bound directly to the table
		//     var aData = oModel.getProperty(sPath);//array of rows
		//     var rowCount = aData.length; 
		//     var currentRowContext;
		//     for (var i = 0; i < rowCount; i++) {
		//         currentRowContext = aData[i]; 
		//     }
		// }






		// onTableUpdateFinished: function (oEvent) {
		// 	var oTable = oEvent.getSource();
		// 	console.log(oTable.getItems())
		// 	var oModel = oTable.getModel();
		// 	console.log(oModel)
		// 	var oData = oModel.getData();
		// 	console.log(oData)
		// 	var sPath = oTable.getBinding("items").getPath(); //path to table's data
		// 	// console.log(sPath)
		// 	var aData = oModel.getProperty(sPath);//array of rows
		// 	console.log(oTable.getAggregation("items"))
		// 	console.log(oTable.getBinding("items"))
		// 	console.log(aData)
		// 	var that = this
		// 	for (var i = 0; i < oTable.getItems().length; i++) {

		// 		// setTimeout(()=> {
		// 		// console.log(i)
		// 		var oProperty = that.getView().getModel().getProperty(oTable.getItems()[i].getBindingContext().getPath());
		// 		console.log(oProperty)
		// 		const d = new Date();
		// 		let ms = d.valueOf();
		// 		console.log(ms)
		// 		// }, 1000)
		// 	}

		// 	var oHeaderbar = oTable.getAggregation("headerToolbar");
		// 	if (oHeaderbar && oHeaderbar.getAggregation("content")[1]) {
		// 		var oTitle = oHeaderbar.getAggregation("content")[1];

		// 		if (oTable.getBinding("items") && oTable.getBinding("items").isLengthFinal()) {
		// 			oTitle.setText("(" + oTable.getBinding("items").getLength() + ")");
		// 		} else {
		// 			oTitle.setText("(0)");
		// 		}
		// 	}
		// 	var oModel = this.getView().getModel(); //model which is bound to the table

		// 	// oModel = this.getOwnerComponent().getModel() 
		// 	console.log(oModel)
		// 	// oModel = oTable.getModel(); //if the model is bound directly to the table
		// 	// console.log(oModel)
		// 	var aData = oModel.getProperty(sPath);//array of rows
		// 	console.log(aData)
		// 	// var rowCount = aData.length;
		// 	// var currentRowContext;
		// 	// for (var i = 0; i < rowCount; i++) {
		// 	// 	currentRowContext = aData[i];
		// 	// 	console.log(currentRowContext)
		// 	// }
		// },
	
		onNavigateSupplier: function (supplierId) {
			var projectId = this.getView().getModel('projectInfo').getProperty('/Spid')
			console.log(projectId, supplierId)
			this.getRouter().navTo("supplier", { projectId, supplierId });
		},
	});
});
