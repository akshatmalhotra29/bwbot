/*global QUnit*/

sap.ui.define([
	"com/bot/ui/ui/controller/botlander.controller"
], function (Controller) {
	"use strict";

	QUnit.module("botlander Controller");

	QUnit.test("I should test the botlander controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});