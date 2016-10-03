/**
 * @ngdoc service
 * @name project.factories:settingFactory
 * @description
 * This file defines the setting  factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function settingFactory(Restangular) {
        var service = {

            menu:menu
        };


        /**
         * @ngdoc method
         * @name menu
         * @methodOf project.factories:settingFactory
         * @description
         * Create the left menu
         * @param {object} listProjects projects list
         */
        function menu(listProjects)
        {
            var projectSelect=[];
            if (listProjects != null){
                listProjects.forEach(function(project){
                    var p = new Object();
                    p= {"label" : project.name , "value" : project.idproject , "builds" :[]};
                    project.allBuilds.forEach(function(build){
                        var item = new Object();
                        item.label=build.name;
                        item.value=build.idbuild;
                        p.builds.push(item);
                    });
                    projectSelect.push(p);
                });
            }

            return projectSelect;

        }



        return service;

    }
    return settingFactory;

});