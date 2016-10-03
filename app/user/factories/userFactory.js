/**
 * @ngdoc service
 * @name user.factories:userFactory
 * @description
 * This file defines the user  factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function userFactory(Restangular) {
        var service = {
            login:login
        };


        /**
         * @ngdoc method
         * @name addOne
         * @methodOf user.factories:userFactory
         * @description
         * Check if there is a user with a valid username and password
         * @param {object} user user to check {"username","password"}
         */
        function login(user) {

            return Restangular.one('login_check').customPOST( user)
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }


        return service;

    }
    return userFactory;

});