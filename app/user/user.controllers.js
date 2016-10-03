/*global define, angular, list of controllers*/
define([
    "./controllers/loginController",
], function (loginController) {
    'use strict';
    var controllersModuleName = "user.controllers";
    angular.module(controllersModuleName, [])
        .controller("user:loginController", loginController);
    return controllersModuleName;
});