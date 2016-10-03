/*global define, angular, list of services*/
define([
    "./factories/projectFactory",
    "./factories/buildFactory",
    "./factories/testCompanyFactory",
    "./factories/testBookletFactory",
    "./factories/resultFactory",
    "./factories/settingFactory"
], function (projectFactory,buildFactory,testCompanyFactory,testBookletFactory,resultFactory,settingFactory) {
    'use strict';
    var servicesModuleName = "project.factory";
    angular.module(servicesModuleName, [])
        .factory('projectFactory', projectFactory)
        .factory('buildFactory', buildFactory)
        .factory('testCompanyFactory',testCompanyFactory)
        .factory('testBookletFactory',testBookletFactory)
        .factory('resultFactory',resultFactory)
        .factory('settingFactory',settingFactory);

    return servicesModuleName;
});