
        'use strict';

        function config ($locationProvider,paginationTemplateProvider,RestangularProvider,$mdIconProvider,$mdThemingProvider,ivhTreeviewOptionsProvider,localStorageServiceProvider,cfpLoadingBarProvider,highchartsNGProvider,$controllerProvider) {

            var app=angular.module('app');
            app.controller = $controllerProvider.register;

            // provider restangular
                RestangularProvider.setBaseUrl('http://127.0.0.1:8000/rest/');
          /*  RestangularProvider.setDefaultHeaders({
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            });*/
            RestangularProvider.setDefaultHttpFields({
                'withCredentials': true
            });
            $locationProvider.html5Mode(true);
            // provider pagination
            paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');

            // intercepteur pour convertir la reponse
                RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
                    var extractedData;
                    if (operation === "getList") {
                        //console.log(data.data);
                        extractedData = data.data;
                    } else {
                        extractedData = data;
                    }
                    return extractedData;
                });
            cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner"><img src="assets/img/spinner2.gif"></div>';
            cfpLoadingBarProvider.includeBar = true;
            cfpLoadingBarProvider.includeSpinner = true;
            // provider treeView
            ivhTreeviewOptionsProvider.set({
                defaultSelectedState: false,
                validate: true,
                expandToDepth: -1,
                twistieCollapsedTpl: '<md-icon md-svg-icon="https://raw.githubusercontent.com/ankoh/mendeley-cache-client/master/app/assets/svg/material-icons/ic_chevron_right_black_24px.svg"></md-icon>',
                twistieExpandedTpl: '<md-icon md-svg-icon="https://raw.githubusercontent.com/ankoh/mendeley-cache-client/master/app/assets/svg/material-icons/ic_expand_more_black_24px.svg"></md-icon>',
                twistieLeafTpl: '<span style="cursor: default;">&#8192;&#8192;</span>',
                idAttribute: 'id',
                labelAttribute: 'label',
                childrenAttribute: 'children',
                selectedAttribute: 'selected',
                useCheckboxes: true,
                indeterminateAttribute: '__ivhTreeviewIndeterminate',
                expandedAttribute: '__ivhTreeviewExpanded',
            });
            //provider localstorage
            localStorageServiceProvider
                .setPrefix('app')
                .setStorageType('sessionStorage')
                .setNotify(true, true);
            highchartsNGProvider.lazyLoad();// will load hightcharts (and standalone framework if jquery is not present) from code.hightcharts.com
            // provider material design
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('indigo')
                .warnPalette('red')
                .backgroundPalette('grey');
            $mdIconProvider.icon('menu','assets/img/menu.svg',24);
            $mdIconProvider.icon('add','assets/img/ic_add_24px.svg',24);
            $mdIconProvider.icon('logout','assets/img/logout.svg',24);
            $mdIconProvider.icon('home','assets/img/home.svg',24);
            $mdIconProvider.icon('add-circle','assets/img/ic_add_circle_black_24px.svg',24);
            $mdIconProvider.icon('add-playlist','assets/img/ic_playlist_add_black_24px.svg',24);
            $mdIconProvider.icon('playlist','assets/img/ic_list_black_24px.svg',24);
            }

