/*global define, angular, list of services*/
define([
    "./factories/userFactory",
    "./factories/AuthenInterceptor"

], function (userFactory,AuthenInterceptor) {
    'use strict';
    var servicesModuleName = "user.factory";
    angular.module(servicesModuleName, [])
        .factory('userFactory',userFactory)
        .factory('AuthenInterceptor',AuthenInterceptor);

    return servicesModuleName;
});