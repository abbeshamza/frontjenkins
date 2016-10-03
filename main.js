/*global require*/
'use strict';

require.config({
    paths: {
        'angular': 'bower_components/angular/angular',
        'uiRouter': "bower_components/angular-ui-router/release/angular-ui-router",
        'angular-animate':'bower_components/angular-animate/angular-animate',
        'angular-aria':'bower_components/angular-aria/angular-aria',
        'angular-material':'bower_components/angular-material/angular-material',
        'ngMessages': 'bower_components/angular-messages/angular-messages',
        'restangular': 'bower_components/restangular/src/restangular',
        'underscore':'bower_components/underscore/underscore',
        'angular-wizard' : 'bower_components/angular-wizard/dist/angular-wizard',
        'file-model' :'bower_components/angular-file-model/angular-file-model',
        "ngCookies" : "bower_components/angular-cookies/angular-cookies",
        "angularUtils":"bower_components/angular-utils-pagination/dirPagination",
        "ivh.treeview" : "bower_components/angular-ivh-treeview/dist/ivh-treeview",
        "angular-local-storage" : "bower_components/angular-local-storage/dist/angular-local-storage",
        "angular-loading-bar" :  "bower_components/angular-loading-bar/build/loading-bar",
        "highcharts-ng" : "bower_components/highcharts-ng/dist/highcharts-ng",
        "highcharts":"bower_components/highcharts/highcharts",
        "d3":"bower_components/d3/d3",
        "angularCharts":"bower_components/angular-charts/dist/angular-charts",
        "angular-jwt" :"bower_components/angular-jwt/dist/angular-jwt",
        "angular-material-data-table":"bower_components/angular-material-data-table/dist/md-data-table"

    },
    shim: {
        angular: {
            exports: 'angular',
        },
        'underscore' :{
            exports : '_'
        },
        'restangular' :{
            deps: [ "angular","underscore"],
            exports : 'restangular'
        },
        'uiRouter':{
            deps: ['angular'],
        },
        'angular-animate' :{
           // exports: "angularAnimate",
            deps: ['angular']
        },
        'angular-aria':{
           // exports: "angularAria",
            deps: [ "angular" ]
        },
        'ngMessages':{
         //   exports: "angularMessages",
            deps: [ "angular" ]
        },
        'angular-material':{
            deps: [ "angular", "ngMessages","angular-aria","angular-animate",]
        },
        'angular-wizard' :{
            deps : ['angular'],
            exports : 'mgo-angular-wizard'
        },
        'file-model' : {
            deps: [ "angular" ]
        },
        'ngCookies' : {
            deps :['angular'],
            exports :"ngCookies"
        },
        "angularUtils":{
            deps :['angular']
        },
        'ivh.treeview' :{
            deps : ["angular","angular-material"]
        },
        'angular-material-data-table':{
            deps : ["angular","angular-material"]
        },
        "angular-local-storage" :{
            deps :['angular']
        },
        "angular-loading-bar":{
            deps:['angular']
        },
        "highcharts":{
            deps:['angular']
        },
        "highcharts-ng":{
            deps:['angular','highcharts']
        },
        "angularCharts":{
            deps:['angular','d3']
        },
        "angular-jwt":{
            deps:['angular']
        }


    },

    deps: ['app/app.module']
});
