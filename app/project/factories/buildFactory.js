/**
 * @ngdoc service
 * @name project.factories:buildFactory
 * @description
 * This file defines the build factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function buildFactory(Restangular) {
        var service = {
            getOneById: getOneById,
            getAll : getAll,
            addOne : addOne,
            addTestCompany:addTestCompany,
            deleteBuild:deleteBuild,
            deleteCompany:deleteCompany

        };
        return service;

        /**
         * @ngdoc method
         * @name getOneById
         * @methodOf project.factories:buildFactory
         * @description
         * Get build by Id
         *  @param {object} $id Id of the build
         */
        function getOneById ($id) {
            return Restangular.one('builds',$id).get()
                .then(function (response) {
                    return response;
                }, function (response) {
                    return(response.data.container);
                });
        }
        /**
         * @ngdoc method
         * @name getAll
         * @methodOf project.factories:buildFactory
         * @description
         * Get the list of builds from the server
         *
         */
        function getAll()
        {
            var res  = [];

            res  = Restangular.all('builds').getList("")
                .then(function (response) {
                    return response;
                }, function () {
                    console.log("Internal Error");
                });
            return res;

        }
        /**
         * @ngdoc method
         * @name addOne
         * @methodOf project.factories:buildFactory
         * @description
         * Add a new Build from the $scope values
         * @param {object} formData Data to send to the server
         */
        function addOne(obj)
        {
           return Restangular.all('builds').post( obj)
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }
        /**
         * @ngdoc method
         * @name addTestCompany
         * @methodOf project.factories:buildFactory
         * @description
         * Create form to add test comapny to a specific build
         *
         */
        function addTestCompany(id , obj)
        {
            return Restangular.one('builds',id).all('testcompanies').post( obj)
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }
        /**
         * @ngdoc method
         * @name deleteBuild
         * @methodOf project.factories:projectFactory
         * @description
         *Delete a specific build
         * @param {object} $id id of the build
         */
        function deleteBuild($id)
        {
            return Restangular.one('builds',$id).remove()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }
        /**
         * @ngdoc method
         * @name deleteCompany
         * @methodOf project.factories:projectFactory
         * @description
         *Delete a specific company from a build
         * @param {object} $idBuild id of the build
         * @param {object} $idCompany id of the company
         */
        function deleteCompany($idBuild,$idCompany)
        {
            return Restangular.one('builds',$idBuild).one('testcompanies',$idCompany).remove()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }


    }

    return buildFactory;

});