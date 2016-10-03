/**
 * @ngdoc controller
 * @name project.controllers:testCompanyController
 * @description
 * This file defines the testCompany controller
 */


define([], function () {
    'use strict';

    testCompanyController.$inject = ['settingFactory','localStorageService','$mdToast','$state','$rootScope', '$scope','testCompanyFactory','projectFactory','ivhTreeviewMgr','buildFactory'];

    function testCompanyController(settingFactory,localStorageService,$mdToast,$state,$rootScope, $scope,testCompanyFactory,projectFactory,ivhTreeviewMgr,buildFactory) {


        var stuff = [];
        var   selectedStuff = [];

        var vm= this;
        vm ={
            stuff:stuff,
            selectedStuff :selectedStuff,
            addTestCompany:addTestCompany,
            saveCompany:saveCompany,
            showDetailRunned:showDetailRunned,
            showTestCompany:showTestCompany,
        };
        /**
         * @ngdoc method
         * @name addTestCompany
         * @methodOf project.controllers:testCompanyController
         * @description
         * Create form to add a new test company based on the selected project
         *
         */
        function addTestCompany(ivhTreeviewBfs, ivhTreeviewMgr){
            if ( localStorageService.get('selectedProject') == undefined)
            {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("No project selected !Select One ")
                        .position('top right')
                        .hideDelay(3000)
                );
                return;
            }
                projectFactory.getTestBooklet(localStorageService.get('selectedProject')).then(function(data) {
                    $scope.items = data;
                    $scope.items.forEach(function(entry){
                        var  cahier=new Object();
                        cahier.label=entry['name'];
                        cahier.children=[];
                        entry.allTestCases.forEach(function(test){
                            var testCase = new Object();
                            testCase.label=test['name'];
                            testCase.value=test['idtestCase'];;
                            cahier.children.push(testCase);
                        });
                        stuff.push(cahier);
                    });
                });
                ivhTreeviewMgr.validate(stuff);

                var  gatherAllSelected = function() {
                    selectedStuff.length = 0;
                    ivhTreeviewBfs(stuff, function(node, parents) {
                        if(node.selected && node.children == null) {
                            selectedStuff.push(node.value);
                        }
                    });
                };
                $scope.$watch(function() {
                    return stuff;
                }, function() {
                    gatherAllSelected();

                }, true);
        }
        /**
         * @ngdoc method
         * @name saveCompany
         * @methodOf project.controllers:testCompanyController
         * @description
         * Save the new test company
         *
         */
        function saveCompany(comapny)
        {
            comapny.testCase=selectedStuff;
            testCompanyFactory.addOne(comapny).then(function(data){
                console.log(data.data.idtestCompany);
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Test Company was created with success!')
                        .position('top right')
                        .hideDelay(3000)
                );
                var obj = new Object();
                obj.testCompany=[data.data.idtestCompany];
                var $idBuild=localStorageService.get('selectedBuild');
                if ($idBuild != null) {
                    buildFactory.addTestCompany($idBuild, obj).then(function (data) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent('Test Company was add to this Build!')
                                .position('top right')
                                .hideDelay(3000)
                        );

                    });
                }
           $state.go("project.selectProject",{"projectId":localStorageService.get('selectedProject')});
        });
        }


        /**
         * @ngdoc method
         * @name showTestCompany
         * @methodOf project.factories:testCompanyFactory
         * @description
         * Show all test companies for a specific build
         *
         */
        function showTestCompany()
        {

            if(localStorageService.get('selectedBuild')== null ||localStorageService.get('selectedProject') == null )
            {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('You need to select a build first !')
                        .position('top right')
                        .hideDelay(4000)
                );
                return ;
            }
            else

            {
                $state.go("project.selectBuild",{'buildId':localStorageService.get('selectedBuild'),'projectId':localStorageService.get('selectedProject')});
            }


        }

        /**
         * @ngdoc method
         * @name showDetailRunned
         * @methodOf project.controllers:testCompanyController
         * @description
         * Show results of the last run for specific company
         *
         */
        function showDetailRunned(id)
        {

        }
        return vm;

    }

    return testCompanyController;
});
