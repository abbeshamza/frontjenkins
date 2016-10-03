/**
 * @ngdoc service
 * @name user.factories:AuthenInterceptor
 * @description
 * This file defines the Authentication Interceptor factory
 */

define([], function () {
    'use strict';
    AuthenInterceptor.$inject = ['$rootScope', '$http','$state','localStorageService','$mdToast'];
    function AuthenInterceptor($rootScope,$http,$state,localStorageService,$mdToast) {
        var service = {
            interceptRequest: interceptRequest,
            interceptResponse: interceptResponse,
            interceptError: interceptError,
            onStateChangeStart:onStateChangeStart,
            onStateChangeSuccess:onStateChangeSuccess,
            onStateChangeError:onStateChangeError
        };


        /**
         * @ngdoc method
         * @name interceptRequest
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Intercept the request
         * @param {object} element The element
         * @param {object} operation The operation
         * @param {object} what Operation to do
         * @param {object} url The URL
         */
        function interceptRequest(element, operation, what, url) {
            $rootScope.pendingRequests++;
            $rootScope.loading = $rootScope.pendingRequests>0;
            var $token=localStorageService.get('jwt');
            $http.defaults.headers.common.Authorization = 'Bearer '+$token;
            $rootScope.loadingSpinner=true;
            return element;
        }

        /**
         * @ngdoc method
         * @name interceptResponse
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Intercept the request
         * @param {object} data The data ressource
         * @param {object} operation The operation to make
         */
        function interceptResponse(data, operation)
        {
            var extractedData;
            if (operation === "getList") {
                //console.log(data.data);
                extractedData = data.data;
            } else {
                extractedData = data;
            }
            $rootScope.loadingSpinner=false;

            return data;
           // return extractedData;

        }
        /**
         * @ngdoc method
         * @name interceptError
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Intercept the request
         * @param {object} response The response to intercept
         *
         */
        function interceptError(response)
        {
            if (response.status === 401) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Invalid Login or password !')
                        .position('top right')
                        .hideDelay(5000)
                );
                $state .go('user.login');
                console.log('probleme d authentification');
            }

        }


        /**
         * @ngdoc method
         * @name onStateChangeStart
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Operation to do when the request is started
         *
         *
         */
        function onStateChangeStart() {
            $rootScope.pendingRequests = 0;
            $rootScope.showPage = false;
        }

        /**
         * @ngdoc method
         * @name onStateChangeSuccess
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Operation to do when the response is success
         *
         *
         */
        function onStateChangeSuccess() {
            $rootScope.spaceReady = true;
        }

        /**
         * @ngdoc method
         * @name onStateChangeError
         * @methodOf user.factories:AuthenInterceptor
         * @description
         * Operation to do when the response is error
         *
         *
         */
        function onStateChangeError(e, toState, toParams, fromState, fromParams, error)
        {
            if(error === "Not Authorized"){
                $state.go("user.login");
            }

        }




        return service;

    }
    return AuthenInterceptor;

});