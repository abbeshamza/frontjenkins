/*global define, angular, list of controllers*/
define([
    "./controllers/projectController",
    "./controllers/buildController",
    "./controllers/testCompanyController",
    "./controllers/resultController",
    "./controllers/menuController"
], function (projectController,buildController,testCompanyController,resultController, menuController) {
    'use strict';
    var controllersModuleName = "project.controllers";
    angular.module(controllersModuleName, [])
        .controller("project:projectController", projectController)
        .controller("project:buildController", buildController)
        .controller("project:testCompanyController",testCompanyController)
        .controller("project:resultController",resultController)
        .controller("project:menuController",menuController);
    return controllersModuleName;
});