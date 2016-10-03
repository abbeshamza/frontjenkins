define([],
    function () {
        'use strict';
        var routesModuleName = "project.routes";
        angular.module(routesModuleName, ['ui.router'])
            .config(["$stateProvider", function ($stateProvider) {
                var modulePath = "app/project";
                $stateProvider
                    .state("project.home", {
                        url: '',
                        templateUrl: modulePath + '/views/project/home.html',
                        controller: 'project:projectController',
                        controllerAs: 'project'
                    })
                    .state("project.new_step1", {
                        url: '/new/step1',
                        templateUrl: modulePath + '/views/steps/step1.html',
                        controller: 'project:projectController',
                        controllerAs: 'project'
                    })
                    .state("project.new_step2", {
                        url: '/new/step2',
                        templateUrl: modulePath + '/views/steps/step2.html',
                        controller: 'project:projectController',
                        controllerAs: 'project'
                    })
                    .state("project.new_step3", {
                        url: '/new/step3',
                        templateUrl: modulePath + '/views/steps/step3.html',
                        controller: 'project:buildController',
                        controllerAs: 'build'
                    })
                    .state("project.new_build", {
                        url: '/newbuild',
                        templateUrl: modulePath + '/views/steps/step3.html',
                        controller: 'project:buildController',
                        controllerAs: 'build'
                    })
                    .state("project.selectProject", {
                        url: '/:projectId/builds',
                        templateUrl: modulePath + '/views/project/project.html',
                        controller: 'project:projectController',
                        controllerAs: 'project'
                    })
                    .state("project.updateProject", {
                        url: '/:projectId/update',
                        templateUrl: modulePath + '/views/project/update.html',
                        controller: 'project:projectController',
                        controllerAs: 'project'
                    })
                    .state("project.selectBuild", {
                        url: '/:projectId/builds/:buildId',
                        templateUrl: modulePath + '/views/build/build.html',
                        controller: 'project:buildController',
                        controllerAs: 'build'
                    })
                    .state("project.show_companies", {
                        url: '/show_companies',
                        templateUrl: modulePath + '/views/testCompanies/list.html',
                        controller: 'project:testCompanyController',
                        controllerAs: 'companies'

                    })
                    .state("project.newTestCompany", {
                        url: '/testCompany/new',
                        templateUrl: modulePath + '/views/testCompanies/new.html',
                        controller: 'project:testCompanyController',
                        controllerAs: 'company'
                    })
                    .state("project.addCompanyBuild", {
                        url: '/:projectId/:buildId/testCompany/new',
                        templateUrl: modulePath + '/views/build/addTestCompany.html',
                        controller: 'project:buildController',
                        controllerAs: 'build'
                    })
                    .state("project.showResult", {
                    url: '/:buildId/testCompanies/:testcompanyId/results/:resultId',
                    templateUrl: modulePath + '/views/result/details.html',
                    controller: 'project:resultController',
                    controllerAs: 'result'
                })
                    .state("project.showResults", {
                        url: '/:buildId/testCompanies/:testcompanyId/results',
                        templateUrl: modulePath + '/views/result/history.html',
                        controller: 'project:resultController',
                        controllerAs: 'result'
                    });
            }]);
        return routesModuleName;
    }
);