
/*global require*/

'use strict';
require([
    'angular',
    'uiRouter',
], function (angular, uiRouter ) {
    require([
        'app/project/project.module',
        'app/user/user.module',
        'app/main.routes',
        'app/app.config',
        'restangular',
        'angular-material',
        'angular-aria',
        'angular-animate',
        'angular-wizard',
        'file-model',
        'angularUtils',
        'ngMessages',
        'ivh.treeview',
        'angular-local-storage',
        'angular-loading-bar',
        'angularCharts',
        'highcharts-ng',
        'angular-material-data-table',
        'angular-jwt'
    ], function (project,user, mainRoutes,restangular) {
        var app = angular.module('app', [project,user, mainRoutes,'restangular','ngMaterial','mgo-angular-wizard','file-model','angularUtils.directives.dirPagination','ngMessages','ivh.treeview','LocalStorageModule','angular-loading-bar','angularCharts','highcharts-ng','md.data.table','angular-jwt']);
        app.config(config)



        angular.bootstrap(document, ['app']);
    });
});


