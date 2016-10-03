/**
 * @ngdoc service
 * @name project.factories:testBookletFactory
 * @description
 * This file defines the testBooklet factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function testBookletFactory(Restangular) {
        var service = {
            getTestBookletByProject:getTestBookletByProject
        };



        /**
         * @ngdoc method
         * @name getTestBookletByProject
         * @methodOf project.factories:testBookletFactory
         * @description
         * Get test booklet by project
         *  @param {object} $idproject Id of project
         */
        function getTestBookletByProject ($idproject) {
            return Restangular.one('projects',$idproject).get('testbooklet').getList("")
                .then(function (response) {
                    return response;
                }, function (response) {
                    return(response.data.container);
                });
        }
        return service;

    }
    return testBookletFactory;

});