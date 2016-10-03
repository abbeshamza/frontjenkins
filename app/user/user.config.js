/**
 * The main config of our application
 *
 * @returns {void}
 */
define([
    //'./factories/AuthenInterceptor',
], function () {
    'use strict';

    var moduleNme = 'user.config';

    angular.module(moduleNme, [])
        .run(function ($rootScope, Restangular, AuthenInterceptor) {


            Restangular.addRequestInterceptor(AuthenInterceptor.interceptRequest);
            Restangular.addResponseInterceptor(AuthenInterceptor.interceptResponse);
            Restangular.setErrorInterceptor(AuthenInterceptor.interceptError);

            $rootScope.$on('$stateChangeStart', AuthenInterceptor.onStateChangeStart);
            $rootScope.$on('$stateChangeSuccess', AuthenInterceptor.onStateChangeSuccess);
            $rootScope.$on('$stateChangeError',AuthenInterceptor.onStateChangeError);
        });

    return moduleNme;


});