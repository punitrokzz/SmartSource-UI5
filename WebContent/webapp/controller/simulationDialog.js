sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History"
], function (ManagedObject, MessageBox, History) {

	return ManagedObject.extend("smartsourceapp.controller.Dialog", {

		constructor: function (oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "smartsourceapp.view.simulationDialog", this);
			this._bInit = false;
		},

		exit: function () {
			delete this._oView;
		},

		getView: function () {
			return this._oView;
		},

		getControl: function () {
			return this._oControl;
		},

		getOwnerComponent: function () {
			return this._oView.getController().getOwnerComponent();
		},

		open: function () {
			var oView = this._oView;
			var oControl = this._oControl;

			if (!this._bInit) {

				// Initialize our fragment
				this.onInit();

				this._bInit = true;

				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}

			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
		},

		close: function () {
			this._oControl.destroy();
		},

		setRouter: function (oRouter) {
			this.oRouter = oRouter;
		},

		getBindingParameters: function () {
			return {};
		},
		handleRadioButtonGroupsSelectedIndex: function () {
			var that = this;
			this.aRadioButtonGroupIds.forEach(function (sRadioButtonGroupId) {
				var oRadioButtonGroup = that.byId(sRadioButtonGroupId);
				var oButtonsBinding = oRadioButtonGroup ? oRadioButtonGroup.getBinding("buttons") : undefined;
				if (oButtonsBinding) {
					var oSelectedIndexBinding = oRadioButtonGroup.getBinding("selectedIndex");
					var iSelectedIndex = oRadioButtonGroup.getSelectedIndex();
					oButtonsBinding.attachEventOnce("change", function () {
						if (oSelectedIndexBinding) {
							oSelectedIndexBinding.refresh(true);
						} else {
							oRadioButtonGroup.setSelectedIndex(iSelectedIndex);
						}
					});
				}
			});

		},
		convertTextToIndexFormatter: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-5");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect: function () {

		},
		convertTextToIndexFormatter1: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-1671335095936");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect1: function () {

		},
		convertTextToIndexFormatter2: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-1671335098112");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect2: function () {

		},
		convertTextToIndexFormatter3: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-1671335098714");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect3: function () {

		},
		convertTextToIndexFormatter4: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-1671336755262");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect4: function () {

		},
		convertTextToIndexFormatter5: function (sTextValue) {
			var oRadioButtonGroup = this.byId("sap_m_Dialog_0-content-sap_m_HBox-1671332664197-items-sap_m_VBox-2-items-sap_m_RadioButtonGroup-1671336756453");
			var oButtonsBindingInfo = oRadioButtonGroup.getBindingInfo("buttons");
			if (oButtonsBindingInfo && oButtonsBindingInfo.binding) {
				// look up index in bound context
				var sTextBindingPath = oButtonsBindingInfo.template.getBindingPath("text");
				return oButtonsBindingInfo.binding.getContexts(oButtonsBindingInfo.startIndex, oButtonsBindingInfo.length).findIndex(function (oButtonContext) {
					return oButtonContext.getProperty(sTextBindingPath) === sTextValue;
				});
			} else {
				// look up index in static items
				return oRadioButtonGroup.getButtons().findIndex(function (oButton) {
					return oButton.getText() === sTextValue;
				});
			}

		},
		_onRadioButtonGroupSelect5: function () {

		},
		onSave: function (oEvent) {
			var sActionsheetName = "";
			this.mActionsheets = this.mActionsheets || {};
			var oActionsheet = this.mActionsheets[sActionsheetName];

			if (!oActionsheet) {
				oActionsheet = new (this.getView());
				this.mActionsheets[sActionsheetName] = oActionsheet;

				oActionsheet.getControl().setPlacement("Auto");

				// For navigation.
				oActionsheet.setRouter(this.oRouter);
			}

			var oSource = oEvent.getSource();

			oActionsheet.open(oSource);

		},
		onCancel: function () {
			this.close();
		},

		onInit: function () {
			this._oDialog = this.getControl();
			console.log("Dialog init")
			console.log(this.getControl())
			// var sPath = this.getControl().getBindingContext().sPath
			var sPath = this.getControl().getBindingContext().getPath();
			// console.log(this.getControl().b)
			this.getControl().bindElement(sPath)
			// console.log(sPath, sPathToBind)
			var that = this
			var serviceURL = that
				.getView()
				.getModel("Settings")
				.getProperty("/oTestUrl");
			console.log("serviceURL", serviceURL)
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			oModel.read(sPath, {
				success: (oData) => {
					console.log(oData)
					var oJson = new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(oJson, 'simulation');
					// simulatedResult.setNumber(oData.Price);
					// dialogContent.setBusy(false);
					// var oJson = new sap.ui.model.json.JSONModel(oData);
					// that.getView().setModel(oJson, 'supplier');
				},
				error: (oError) => {
					console.log(oError);
					// dialogContent.setBusy(false);
				},
			});

		},



		onExit: function () {
			this._oDialog.destroy();
		},

		getOModel() {
			// var serviceURL = this.getView()
			// 	.getModel("Settings")
			// 	.getProperty("/oDataUrl");
			// return new sap.ui.model.odata.v2.ODataModel(serviceURL);
			var serviceURL = this
				.getView()
				.getModel("Settings")
				.getProperty("/oTestUrl");
			console.log("serviceURL", serviceURL)
			return new sap.ui.model.odata.v2.ODataModel(serviceURL);
		},

		getModel() {
			return this.getView().getModel();
		},

		getContext(oEvent) {
			return oEvent.getSource().getBindingContext();
		},


		onSimulate: function () {
			var dialogContent = this.getView().byId('dialogContent');
			dialogContent.setBusy(true);
			var simulatedResult = this.getView().byId('simulatedResult');
			var that = this
			// that.getView().setModel(this, "Settings");
			var sPath = this.getControl().getBindingContext().sPath
			var serviceURL = that
				.getView()
				.getModel("Settings")
				.getProperty("/oTestUrl");
			var oModel = new sap.ui.model.odata.v2.ODataModel(serviceURL);
			oModel.read(sPath, {
				success: (oData) => {
					console.log(oData)
					simulatedResult.setNumber(oData.Price);
					dialogContent.setBusy(false);
				},
				error: (oError) => {
					console.log(oError);
					dialogContent.setBusy(false);
				},
			});
		},

		onSave: function () {
			console.log("save")
			var that = this;
			// this.close()
			var sPath = this.getControl().getBindingContext().sPath
			var sPathToBind = this.getControl().getBindingContext().getPath();
			console.log(sPath, sPathToBind)
			var simulatedResult = this.getView().byId('simulatedResult');
			var Price = simulatedResult.getNumber()
			console.log(that.getView().byId('simulationList'))
			console.log(that.getView().byId('simulationList').getBinding("items"))

			this.getOModel().update(
				sPath,
				{ Price: Number(Price) },
				{
					method: "PUT",
					success: function (oData, oResponse) {
						console.log("success", oData, oResponse);
						that.getView().byId('simulationList').getBinding("items").refresh(true);
						that.close();
					},
					error: function (oError) {
						console.log("ERROE", oError);
						sap.m.MessageToast.show("Error during save");
					},
				}
			);
		},
	});
}, /* bExport= */ true);
