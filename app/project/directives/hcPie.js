/**
 * Created by hab on 13/06/16.
 */
/**
 * @ngdoc directive
 * @name project.directives:fileModel
 *
 * @description
 * Read files in html
 *
 */
define([], function () {
    'use strict';

    function hcPie($parse) {
        return {
            restrict: 'C',
            replace: true,
            scope: {
                items: '='
            },
            controller: function ($scope, $element, $attrs) {


            },
            template: '<div id="container" style="margin: 0 auto">not working</div>',
            link: function (scope, element, attrs) {

                var chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Results '
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function () {
                                    return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Test percentage',
                        data: scope.items
                    }]
                });
                scope.$watch("items", function (newValue) {
                    chart.series[0].setData(newValue, true);
                }, true);

            }
        }
    }
    return hcPie;
});
