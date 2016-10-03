/**
 * @ngdoc controller
 * @name project.controllers:menuController
 * @description
 * This file defines the menu controller
 */

define([], function () {
    'use strict';

    menuController.$inject = ['settingFactory','localStorageService','$state','$mdToast','$rootScope', '$scope','$stateParams','projectFactory','buildFactory','$mdDialog','$mdMedia'];

    function menuController(settingFactory,localStorageService,$state,$mdToast,$rootScope, $scope,$stateParams,projectFactory,buildFactory,$mdDialog) {

       var vm = this;
        /**
         * @ngdoc method
         * @name configMenu
         * @methodOf project.controllers:menuController
         * @description
         * Configuration of the side menu .
         *
         *
         */
        vm.listProjects=localStorageService.get('listProjects');
        vm.buildDefaultSelect =localStorageService.get('selectedBuild');
        vm.projectDefaultSelect =localStorageService.get('selectedProject');
        if(vm.listProjects != null)
            vm.setting=settingFactory.menu(vm.listProjects);
        vm.changeProject=function(obj){
            localStorageService.set('selectedProject',obj.value);
            $rootScope.nameOfProject=obj.label;
            $rootScope.nameOfBuild=undefined;
            localStorageService.remove('selectedBuild');

        };
        vm.changeBuild=function(obj){
            localStorageService.set('selectedBuild',obj.value);
            $rootScope.nameOfBuild=obj.label;

        };


    }

    return menuController;
});
