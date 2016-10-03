/**
 * @ngdoc controller
 * @name user.controllers:loginController
 * @description
 * This file defines the security controller
 */


define([], function () {
    'use strict';

    loginController.$inject = ['$http','userFactory','localStorageService','$mdToast','$state','$rootScope', '$scope'];

    function loginController($http,userFactory,localStorageService,$mdToast,$state,$rootScope, $scope) {



        var vm= this;
        vm ={
            login:login,
            logout:logout

        };

        /**
         * @ngdoc method
         * @name login
         * @methodOf user.controllers:loginController
         * @description
         * Login a user
         * @param {object} user The user to login.
         *
         *
         */
        function login(user) {
            userFactory.login(user).then(function(data){
                localStorageService.set("jwt",data.token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                $state.go('project.home');
            });
        }
        /**
         * @ngdoc method
         * @name logout
         * @methodOf user.controllers:loginController
         * @description
         * Logout a user .
         *
         *
         */
        function logout() {
            localStorageService.clearAll();
            $state.go('user.login');
        }
        return vm;

    }

    return loginController;
});
