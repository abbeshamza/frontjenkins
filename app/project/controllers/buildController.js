/**
 * @ngdoc controller
 * @name project.controllers:buildController
 * @description
 * This file defines the build controller
 */

define([], function () {
    'use strict';

    buildController.$inject = ['settingFactory','testCompanyFactory','projectFactory','localStorageService','$mdToast','$state','$rootScope', '$scope','buildFactory'];

    function buildController(settingFactory,testCompanyFactory,projectFactory,localStorageService,$mdToast,$state,$rootScope, $scope,buildFactory) {

        var vm= this;
        vm ={
            saveBuild:saveBuild,
            getSelectedBuild:getSelectedBuild,
            addTestCompany:addTestCompany,
            saveTestCompany:saveTestCompany,
            runCompany:runCompany,
            showDetail:showDetail,
            deleteBuild:deleteBuild,
            deleteCompany:deleteCompany
        };
         /**
         * @ngdoc method
         * @name saveBuild
         * @methodOf project.controllers:buildController
         * @description
         * Save a new build .
         *
         */

        function saveBuild() {

            if( localStorageService.get('selectedProject') == undefined)
            {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('There is no project selected!')
                        .position('top right')
                        .hideDelay(5000)
                );
                return

            }
            $scope.newBuild.name = $scope.newBuild.name;
            $scope.newBuild.project = localStorageService.get('selectedProject');

            var obj =$scope.newBuild;
            buildFactory.addOne(obj).then(function (data) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Build was created!')
                        .position('top right')
                        .hideDelay(3000)
                );
                localStorageService.set('selectedBuild',data.data.idbuild);
                $state.go('project.selectProject',{'projectId':localStorageService.get('selectedProject')});


            });
        }

        /**
         * @ngdoc method
         * @name getBuild
         * @methodOf project.controllers:buildController
         * @description
         * get a specific build by Id .
         *
         */
        function getSelectedBuild($stateParams)
        {

            buildFactory.getOneById(localStorageService.get('selectedBuild')).then(function(data){
                $scope.currentPage = 1;
                $scope.pageSize = 4;
                if(data['code'] == "200")
                {
                    $scope.testCompanies=data.data.testCompany;
                    $scope.project=data.data.project;
                    $scope.buildSelected=data.data.idbuild;
                }
                else
                {
                    console.log("error");
                }

            });
        }


        /**
         * @ngdoc method
         * @name addTestCompany
         * @methodOf project.controllers:buildController
         * @description
         * add test company to a specific build .
         *
         */

        function addTestCompany()
        {
            var idProject=localStorageService.get('selectedProject');
            projectFactory.getTestCompanies(idProject).then(function(data){
                $scope.testCompanies=data;
                $scope.items = $scope.testCompanies;


            $scope.selected = [];
            $scope.toggle = function (item, list) {
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
            };
            $scope.exists = function (item, list) {
                return list.indexOf(item) > -1;
            };
            $scope.isIndeterminate = function() {
                return ($scope.selected.length !== 0 &&
                $scope.selected.length !== $scope.items.length);
            };
            $scope.isChecked = function() {
                return $scope.selected.length === $scope.items.length;
            };
            $scope.toggleAll = function() {
                if ($scope.selected.length === $scope.items.length) {
                    $scope.selected = [];
                } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                    for (var i = 0; i < $scope.items.length; i++) {
                        $scope.selected.push ($scope.items[i].idtestCompany) ;
                    }
                }
            };
                $scope.build.id=localStorageService.get('selectedBuild');
                $scope.testCompanies= $scope.selected;

            });

        }
        /**
         * @ngdoc method
         * @name saveTestCompany
         * @methodOf project.controllers:buildController
         * @description
         * Save test company to a specific build .
         *
         */

        function saveTestCompany()
        {
            var obj = new Object();
            var id=localStorageService.get('selectedBuild');
            obj.testCompany=$scope.testCompanies;
            buildFactory.addTestCompany(id , obj).then(function(data){

                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Test Company was add to this Build!')
                        .position('top right')
                        .hideDelay(3000)
                );
                $state.go('project.selectBuild',{"projectId": localStorageService.get('selectedProject'),"buildId":localStorageService.get('selectedBuild')});
            },function(error){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('A problem was occurenced try again!')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
        }
        /**
         * @ngdoc method
         * @name runCompany
         * @methodOf project.controllers:buildController
         * @description
         * Run a specific Test Company .
         *
         */
        function runCompany(idCompany)
        {
            var $idBuild=localStorageService.get('selectedBuild');
            testCompanyFactory.runCompany($idBuild,idCompany).then(
                function(response)
                {

                    if( response !== undefined && response.code == 201)
                    {
                        var idresult = response.data.idresultat;
                        var idbuild =response.data.build.idbuild;
                        var idcompany=response.data.testCompany.idtestCompany;
                        $state.go("project.showResult",{"buildId":idbuild,"testcompanyId":idcompany,"resultId":idresult});
                    }
                }
                , function (error) {
                    console.log('eroor')

                }
            );

        }
        /**
         * @ngdoc method
         * @name runCompany
         * @methodOf project.controllers:buildController
         * @description
         * Delete a specific Build .
         * @param {object} item the item
         *
         */
        function deleteBuild(item)
        {

            buildFactory.deleteBuild( item.idbuild).then(function(data){
                if(data !== undefined && data.code == 200)
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Build was Deleted with success !')
                            .position('top right')
                            .hideDelay(4000)
                    );
                    $scope.listProjects.splice($scope.listProjects.indexOf(item), 1);


                }
                else
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There is no project with this ID!')
                            .position('top right')
                            .hideDelay(4000)
                    );
                }


            },function(error){


            });

        }
        /**
         * @ngdoc method
         * @name showDetail
         * @methodOf project.controllers:buildController
         * @description
         * redirect the user to the page details of a specific test company .
         * @param {object} company The company
         *
         */
        function showDetail(company)
        {
            var idbuild=localStorageService.get('selectedBuild');
            $state.go("project.showResults",{"buildId":idbuild,"testcompanyId":company});

        }
        /**
         * @ngdoc method
         * @name runCompany
         * @methodOf project.controllers:buildController
         * @description
         * Delete a specific test company from the Build .
         * @param {object} build The build
         * @param {object} company The company
         *
         */
        function deleteCompany(build,company)
        {
            console.log('here');
            buildFactory.deleteCompany(build,company).then(function(data){
                if(data !== undefined && data.code == 200)
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('TestCompany was Deleted with success from this Build !')
                            .position('top right')
                            .hideDelay(4000)
                    );
                    $scope.testCompanies.splice($scope.testCompanies.indexOf(company), 1);
                }
                else
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There is a problem while deleting this TestCompany!')
                            .position('top right')
                            .hideDelay(4000)
                    );
                }


            },function(error){


            });

        }

        return vm;

    }

    return buildController;
});
