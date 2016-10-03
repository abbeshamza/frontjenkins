/**
 * @ngdoc service
 * @name project.factories:projectFactory
 * @description
 * This file defines the project factory
 */

define(['restangular'], function (Restangular) {
    'use strict';

    function projectFactory(Restangular) {
        var service = {
            getOneById: getOneById,
            getAll : getAll,
            addOne : addOne,
            getTestBooklet:getTestBooklet,
            getTestCompanies:getTestCompanies,
            patchProject:patchProject,
            projectUpdate:projectUpdate,
            deleteProject:deleteProject
        };
        return service;

        /**
         * @ngdoc method
         * @name getOneById
         * @methodOf project.factories:projectFactory
         * @description
         * Get project by Id
         *  @param {object} $id Id of the project
         */
            function getOneById ($id) {
                return Restangular.one('projects',$id).get()
                    .then(function (response) {
                        return response;
                    }, function (response) {
                        return(response.data.container);
                    });
            }
        /**
         * @ngdoc method
         * @name getAll
         * @methodOf project.factories:projectFactory
         * @description
         * Get the list of projects from the server
         *
         */
        function getAll()
        {
            var res  = [];

            res  = Restangular.all('projects').getList("")
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
         * @methodOf project.factories:projectFactory
         * @description
         * Add a new Project from the $scope values
         * @param {object} formData Data to send to the server
         */
        function addOne(formData)
        {
            return Restangular.all('projects')
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, '', undefined, {'Content-Type': undefined})
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response.data.container);
                });

        }
        /**
         * @ngdoc method
         * @name addOne
         * @methodOf project.factories:projectFactory
         * @description
         * Update a specific Project
         * @param {object} formData Data to send to the server
         */
        function projectUpdate(id,formData)
        {
            return Restangular.one('projects',id).all('updates')
                .withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, '', undefined, {'Content-Type': undefined})
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });


        }

        /**
         * @ngdoc method
         * @name getTestBooklet
         * @methodOf project.factories:projectFactory
         * @description
         * Get TestBooklet for a specific project
         * @param {object} $id id of the project
         */
        function getTestBooklet($id)
        {
            var res  = [];
          res = Restangular.one('projects',$id).all("testbooklet").getList()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response.data);
                });
            return res ;

        }

        /**
         * @ngdoc method
         * @name getTestCompanies
         * @methodOf project.factories:projectFactory
         * @description
         * Get test companies for a specific project
         * @param {object} $id id of the project
         */
        function getTestCompanies($id)
        {
            return Restangular.one('projects',$id).all("testcompanies").getList()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }
        /**
         * Update Project data
         *
         * @param {number} id
         * @param {object} patch
         * @returns {object} response
         */
        function patchProject(id,patch)
        {
            return Restangular.one('projects',id).patch(patch)
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });


        }
        /**
         * @ngdoc method
         * @name deleteProject
         * @methodOf project.factories:projectFactory
         * @description
         *Delete a specific project
         * @param {object} $id id of the project
         */
        function deleteProject($id)
        {
            return Restangular.one('projects',$id).remove()
                .then(function (response) {
                    return response;
                }, function (response) {
                    console.log(response);
                });

        }

    }

    return projectFactory;

});