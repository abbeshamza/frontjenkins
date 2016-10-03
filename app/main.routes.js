define([],
    function () {
        'use strict';

        var routesModuleName = 'main.routes';

        angular.module(routesModuleName, ['ui.router'])
            .config(['$stateProvider', function ($stateProvider,$urlRouterProvider) {
                $stateProvider
                    .state('project', {
                        url: '/project',
                        abstract:true ,
                        template: '<div ui-view></div>',
                        resolve: {
                            security: ['$q','localStorageService', function($q,localStorageService){
                                if( ! localStorageService.get('jwt')){
                                    return $q.reject("Not Authorized");
                                }
                            }]
                        }
                    })
                    .state('user', {
                        url: '/user',
                        abstract:true ,
                        template: '<div ui-view></div>',
                    })

            }]);
        return routesModuleName;
    }
);

