/**
 * @ngdoc controller
 * @name project.controllers:projectController
 * @description
 * This file defines the project controller
 */

define([], function () {
    'use strict';

    projectController.$inject = ['settingFactory','localStorageService','$state','$mdToast','$rootScope', '$scope','$stateParams','projectFactory','buildFactory','$mdDialog','$mdMedia'];

    function projectController(settingFactory,localStorageService,$state,$mdToast,$rootScope, $scope,$stateParams,projectFactory,buildFactory,$mdDialog) {

        var vm= this;
        vm ={
            listProject:listProject,
            saveProject:saveProject,
            goToStep3:goToStep3,
            selectProject:selectProject,
            selectBuild:selectBuild,
            addTestCompanyToBuild:addTestCompanyToBuild,
            goToProject:goToProject,
            closeProject:closeProject,
            changeName:changeName,
            updateName:updateName,
            goToUpdate:goToUpdate,
            updateProject:updateProject,
            saveUpdates:saveUpdates,
            deleteProject:deleteProject,
            deleteProjectPopup:deleteProjectPopup,
            deleteBuild:deleteBuild,
            showDeleteProjectConfirmation:showDeleteProjectConfirmation
        };
        /**
         * @ngdoc method
         * @name listProject
         * @methodOf project.controllers:projectController
         * @description
         * Get the list of project
         */
        function listProject()
        {
            projectFactory.getAll().then(function(data){
                $rootScope.listProjects=data;
                localStorageService.set('listProjects',$scope.listProjects);
            });
            $scope.currentPage = 1;
            $scope.pageSize = 4;

        }

        /**
         * @ngdoc method
         * @name saveProject
         * @methodOf project.controllers:projectController
         * @description
         * Save a new project .
         * The Zip file must contains 3 directories (controllers , pages  , scripts) and the _bootstrap.php file that contains the data to use .
         */

        function saveProject()
        {
            var formData = new FormData();
            formData.append('file', $scope.newProject.file);
            formData.append('name',$scope.newProject.name);
            formData.append('url',$scope.newProject.url);
            formData.append('description',$scope.newProject.description);
            projectFactory.addOne(formData).then(function(data){

                if(data.code == "201")
                {
                    localStorageService.set('selectedProject',data.data.idproject);
                    var list =   localStorageService.get('listProjects');
                    if (list != null)
                    list.push(data.data);
                    localStorageService.set('listProjects',$scope.list);
                    if( localStorageService.get('selectedBuild') != undefined)
                        localStorageService.remove('selectedBuild');
                    $rootScope.selectedProject=data.data;
                    $rootScope.nameOfProject=data.data.name;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(data.message)
                            .position('top right')
                            .hideDelay(3000)
                    );
                    $state.go("project.new_step2");

                }
                else
                {
                    console.log("error");
                }

            });
        }
        /**
         * @ngdoc method
         * @name goTOStep3
         * @methodOf project.controllers:projectController
         * @description
         * Go to step 3 .
         *
         */
        function goToStep3()
        {
            $state.go("project.new_step3");

        }
        /**
         * @ngdoc method
         * @name selectProject
         * @methodOf project.controllers:projectController
         * @description
         * Select a specific project
         *
         */
        function selectProject()
        {
            projectFactory.getOneById( localStorageService.get('selectedProject')).then(function(data){
                $scope.currentPage = 1;
                $scope.pageSize = 4;
                if(data['code'] == "200")
                {
                    $scope.projectSelected=data.data;
                    $scope.selectedProject=$scope.projectSelected;
                }
                else
                {
                    console.log("error");
                }

            });

        }

        /**
         * @ngdoc method
         * @name selectBuild
         * @methodOf project.controllers:projectController
         * @description
         * Store a specific build in the $rootScope.
         * @param {object} id Id of the build.
         *
         */
        function selectBuild(id)
        {
            localStorageService.set('selectedBuild',id);
            buildFactory.getOneById(id).then(function(data){
                $rootScope.nameOfBuild=data.data.name;
            });
            $state.go("project.selectBuild",{"projectId": localStorageService.get('selectedProject'),"buildId":id});

        }
        /**
         * @ngdoc method
         * @name addTestCompanyToBuild
         * @methodOf project.controllers:projectController
         * @description
         * Select a build to add a Test Company
         * @param {object} id Id of the build.
         *
         */

        function addTestCompanyToBuild($id)
        {
            localStorageService.set('selectedBuild', $id);
            buildFactory.getOneById($id).then(function(data){
                $rootScope.nameOfBuild=data.data.name;
            });
            $state.go("project.addCompanyBuild",{"projectId": localStorageService.get('selectedProject'),"buildId":$id});

        }
        /**
         * @ngdoc method
         * @name goToProject
         * @methodOf project.controllers:projectController
         * @description
         * Go to the selected project and show the list of builds
         * @param {object} id Id of the project
         *
         */
        function goToProject(id)
        {
            localStorageService.set('selectedProject', id);
            if(localStorageService.get('selectedProject')!= undefined)
            localStorageService.remove('selectedBuild');
            $rootScope.nameOfBuild=undefined;
            projectFactory.getOneById( localStorageService.get('selectedProject')).then(function(data){
               $rootScope.nameOfProject=data.data.name;
            });

            $state.go("project.selectProject",{'projectId':id });

        }
        /**
         * @ngdoc method
         * @name closeProject
         * @methodOf project.controllers:projectController
         * @description
         * Change the status of the project
         * @param {object} id Id of the project
         *
         */
        function closeProject(id)
        {
            var patch= [{"op": "change", "path": "/status"}] ;
            projectFactory.patchProject( id,patch).then(function(data){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Project status was changed!')
                        .position('top right')
                        .hideDelay(3000)
                );
                location.reload();
               // $state.go("project.home");
            },function(error){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('could not change the project status!')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
        }
        /**
         * @ngdoc method
         * @name closeProject
         * @methodOf project.controllers:projectController
         * @description
         * Change the status of the project
         * @param {object} item The project
         * @param {object} $event The events to do
         *
         */
        function changeName(item,$event)
        {

            $rootScope.item=item;
            $mdDialog.show({
                templateUrl:'./app/project/views/project/changeNamePopup.html',
                clickOutsideToClose:true,
                controller:projectController,
                controllerAs: 'project',
                targetEvent:$event,

            });

        }

        /**
         * @ngdoc method
         * @name updateName
         * @methodOf project.controllers:projectController
         * @description
         * Send the patch request to change the name
         *
         *
         */
        function updateName ()
        {
            $mdDialog.hide();
            var patch=  [{"op": "rename", "path": "/name","params" : [$scope.project.name]}]
            projectFactory.patchProject( $rootScope.item.idproject,patch).then(function(data){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Project name was changed!')
                        .position('top right')
                        .hideDelay(3000)
                );

                location.reload();
             // var index=$scope.listProject.indexOf(item);
               // $scope.listProject[index].name=$scope.project.name;


            },function(error){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('could not change the project status!')
                        .position('top right')
                        .hideDelay(3000)
                );
            });
        }

        function goToUpdate($id)
        {
            $state.go("project.updateProject",{'projectId':$id });

        }
        /**
         * @ngdoc method
         * @name updateProject
         * @methodOf project.controllers:projectController
         * @description
         * This function will update an existing project
         *
         *
         */

        function updateProject($stateParams)
        {
            projectFactory.getOneById( $stateParams.projectId).then(function(data){

                if(data.code == 200)
                {
                 //   console.log(data.data);
                    $scope.projectToUpdate=data.data;


                }
                else
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There is no project with this ID!')
                            .position('top right')
                            .hideDelay(3000)
                    );
                }


            },function(error){
            });
        }
        /**
         * @ngdoc method
         * @name updateProject
         * @methodOf project.controllers:projectController
         * @description
         * This function will save updates for an existing project then redirect to the home page
         *
         *
         */
        function saveUpdates()
        {
            var formData = new FormData();
            formData.append('file', $scope.projectToUpdate.file);
            formData.append('name',$scope.projectToUpdate.name);
            formData.append('url',$scope.projectToUpdate.url);
            formData.append('idproject',$scope.projectToUpdate.idproject);
            formData.append('description',$scope.projectToUpdate.description);
            projectFactory.projectUpdate($scope.projectToUpdate.idproject,formData).then(function(data){


                if(data)
                {
                    var message ;
                    if (data.message !==  null)
                    message= 'the project was updated with '+data.message;
                    else
                    message='the project was updated with success';
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(message)
                            .position('top right')
                            .hideDelay(4000)
                    );
                }
                else
                {
                   // console.log("error");
                }

            });

        }
        function showDeleteProjectConfirmation(item,$event)
        {
            $rootScope.projectToDelete=item;
            $mdDialog.show({
                templateUrl:'./app/project/views/project/deleteProjectPopup.html',
                clickOutsideToClose:true,
                controller:projectController,
                controllerAs: 'project',
                targetEvent:$event,


            });
        }
        function deleteProjectPopup()
        {

        }

        /**
         * @ngdoc method
         * @name deleteProject
         * @methodOf project.controllers:projectController
         * @description
         * This function will delete a project
         *
         *
         *
         */

        function deleteProject()
        {
            $scope.item = $rootScope.projectToDelete;
           $scope.confirmDelete= projectFactory.deleteProject( $rootScope.projectToDelete.idproject).then(function(data){
                if(data !== undefined && data.code == 200)
                {

                    $mdToast.show(
                    $mdToast.simple()
                        .textContent('Project was Deleted with success !')
                        .position('top right')
                        .hideDelay(4000)
                );
                    $mdDialog.hide();

                    $rootScope.listProjects.splice($rootScope.listProjects.indexOf($scope.item), 1);


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
         * @name runCompany
         * @methodOf project.controllers:projectController
         * @description
         * Delete a specific Build .
         * @param {object} item Build to delete
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
                    $scope.projectSelected.allBuilds.splice($scope.projectSelected.allBuilds.indexOf(item), 1);


                }
                else
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('There is no Build with this ID!')
                            .position('top right')
                            .hideDelay(4000)
                    );
                }


            },function(error){


            });

        }


        $scope.$watch( 'listProjects',function(newValue,oldValue)
        {
            //console.log("old :"+oldValue +" new value is "+newValue);
        });


        return vm;

    }

    return projectController;
});
