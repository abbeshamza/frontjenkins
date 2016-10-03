
/**
 * @ngdoc controller
 * @name project.controllers:resultController
 * @description
 * This file defines the result controller
 */

define([], function () {
    'use strict';

    reultController.$inject = ['settingFactory','$filter','localStorageService','$state','$rootScope', '$scope','$stateParams','resultFactory','$mdDialog','$mdMedia'];

    function reultController(settingFactory,$filter,localStorageService,$state,$rootScope, $scope,$stateParams,resultFactory,$mdDialog) {

        var vm= this;
        vm ={
            getResultById:getResultById,
            getResult:getResult
        };

        /**
         * @ngdoc method
         * @name getResultById
         * @methodOf project.controllers:resultController
         * @description
         * Get a specific result of test by build and company  .
         *
         *
         */
        function getResultById()
        {
            var  $id=$stateParams.resultId;
            var $idBuild=localStorageService.get('selectedBuild');
            var  $idCompany=$stateParams.testcompanyId;
            resultFactory.getResultById($idBuild,$idCompany,$id).then(function(data){
                $scope.results=data.data;
                var details =data.data['allResultDetail'];
                var ok=[];
                var notok=[];
               details.forEach(function(detail){
                   if(detail.status=="Not OK")
                   {
                       notok.push(detail);
                   }
                  if (detail.status=="OK")
                   ok.push(detail);
               });
                $scope.result = [
                    ['Test OK', ok.length],
                    ['Test Not OK', notok.length]
                ];
                $scope.limitedIdeas =  $scope.result;
                var data=resultFactory.prepareReporting( $scope.results);
                $scope.config=data.config;
                $scope.data=data.data;
                $scope.testFailed=notok;
                $scope.testSuccess=ok;

            });
        }
        /**
         * @ngdoc method
         * @name getResultById
         * @methodOf project.controllers:resultController
         * @description
         * Get all results of test by build and company  .
         *
         *
         */
        function getResult()
        {

            var  $idCompany=$stateParams.testcompanyId;
            var  $idBuild=localStorageService.get('selectedBuild');
            resultFactory.getResults($idBuild,$idCompany).then(function(data){
                var results=data;


                var ok ;
                var notOK;
                var items =[];
                results.forEach(function(result){
                    ok=0;
                    notOK =0;
                    result.allResultDetail.forEach(function(detail){
                        if(detail.status=="Not OK")
                        {
                            notOK ++;
                        }
                        else
                            ok ++;
                    });

                    var item = new Object();
                    item.x=$filter('date')(result.date, 'yy-MM-dd HH');
                    item.y=[ok,notOK];
                    items.push(item);

                });
                $scope.results=results;

                $scope.data={
                    'series':['Test Ok', 'Test Not OK'],
                    'data' : items
                };
                $scope.limitedIdeas =  $scope.result;
                $scope.config=resultFactory.config();


            });
        }



        return vm;

    }

    return reultController;
});
