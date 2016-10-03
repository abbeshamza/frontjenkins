/**
 * @ngdoc service
 * @name project.factories:testCompanyFactory
 * @description
 * This file defines the testCompany  factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function testCompanyFactory(Restangular) {
        var service = {
            addOne:addOne,
            runCompany:runCompany,
            deleteCompany:deleteCompany
        };


        /**
         * @ngdoc method
         * @name addOne
         * @methodOf project.factories:testCompanyFactory
         * @description
         * Add a new Build from the $scope values
         * @param {object} formData Data to send to the server
         */
        function addOne(obj)
        {
            return Restangular.all('testcompanies').post( obj)
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }

        /**
         * @ngdoc method
         * @name runCompany
         * @methodOf project.factories:testCompanyFactory
         * @description
         * run a specific testCompanyFactory
         * @param {object} idBuild Id of the build
         * @param {object} idCompany Id of the Company
         */
        function runCompany(idBuild,idCompany)
        {

            return Restangular.one('builds',idBuild).one('testcompanies',idCompany).all('results').post()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log('error');
                });

        }
        /**
         * @ngdoc method
         * @name deleteCompany
         * @methodOf project.factories:testCompanyFactory
         * @description
         * Delete a specific TestCompany
         * @param {object} idCompany object that contains the Id of the test comapny
         */
        function deleteCompany(idCompany)
        {
            return Restangular.one('testcompanies',$id).remove()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }


        return service;

    }
    return testCompanyFactory;

});