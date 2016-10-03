/**
 * @ngdoc service
 * @name project.factories:resultFactory
 * @description
 * This file defines the result factory
 */

define(['restangular'], function (Restangular) {
    'use strict';
    function resultFactory(Restangular) {
        var service = {
            getResultById:getResultById,
            prepareReporting:prepareReporting,
            getResults:getResults,
            config:config
        };



        var configChart=
        {
            title: '',
                tooltips: true,
            labels: false,
            mouseover: function() {

            },
            mouseout: function() {},
            click: function() {

            },
            colors: ['green','red', '#ec8f6e'],
                legend: {
            display: true,
                //could be 'left, right'
                position: 'right'
        },
            innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
                lineLegend: 'lineEnd' // can be also 'traditional'
        };




        /**
         * @ngdoc method
         * @name getResultById
         * @methodOf project.factories:resultFactory
         * @description
         * Get a Results for specific test Cmpany
         *  @param {object} $idbuild id Of the build
         *  @param {object} $idCompany id of the test company
         *  @param {object} $idResult id of the result
         */
        function getResultById ($idbuild,$idCompany,$idResult) {
            return Restangular.one('builds',$idbuild).one('testcompanies',$idCompany).one('results',$idResult).get()
                .then(function (response) {
                    return response;
                }, function (response) {
                    return(response.data.container);
                });
        }




        /**
         * @ngdoc method
         * @name getResultById
         * @methodOf project.factories:resultFactory
         * @description
         * Get all Results for specific test Company
         *  @param {object} $idbuild id Of the build
         *  @param {object} $idCompany id of the test company
         *
         */
        function getResults ($idbuild,$idCompany) {
            return Restangular.one('builds',$idbuild).one('testcompanies',$idCompany).all('results').getList("")
                .then(function (response) {
                    return response;
                }, function (response) {
                    return(response.data.container);
                });
        }


        /**
         * @ngdoc method
         * @name prepareReporting
         * @methodOf project.factories:resultFactory
         * @description
         * Prepare data for charts and reporting
         *  @param {object} $data $data to use
         *
         */
        function prepareReporting($detail)
        {

            var obj = new Object();
            obj.config=config();

           obj.data = {
                series: ['Assertions', 'Failed', 'Error'],
                data: [{
                    x: "results of"+$detail.testCompany.name,
                    y: [$detail.assertion, $detail.failure, $detail.error],
                }]
            };


            return obj;
        }


        function config()
        {
            return {
                title: '',
                tooltips: true,
                labels: false,
                width: '100%',
                mouseover: function() {
                },
                mouseout: function() {},
                click: function(d) {
                    console.log("clicked "+ d.x);

                },
                colors: ['#46BFBD','red', '#ec8f6e'],
                legend: {
                    display: true,
                    //could be 'left, right'
                    position: 'right'
                },
                innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
                lineLegend: 'traditional' // can be also 'traditional'
            };

        }
        return service;

    }
    return resultFactory;

});