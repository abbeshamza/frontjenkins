define([],
    function () {
        'use strict';
        var routesModuleName = "user.routes";
        angular.module(routesModuleName, ['ui.router'])
            .config(["$stateProvider", function ($stateProvider) {
                var modulePath = "app/user";
                $stateProvider
                    .state("user.login", {
                        url: '/login',
                        templateUrl: modulePath + '/views/user/login.html',
                        controller: 'user:loginController',
                        controllerAs: 'login'
                    });
            }]);
        return routesModuleName;
    }
);