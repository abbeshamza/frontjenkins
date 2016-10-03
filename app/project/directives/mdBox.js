/**
 * @ngdoc directive
 * @name project.directives:triView
 *
 * @description
 * create a tree view
 *

 */
define([], function () {
    'use strict';


    function mdBox(ivhTreeviewMgr) {
        return {
            restrict: 'AE',
            require: '^ivhTreeview',
            template: [
                '<span class="ascii-box">',
                '<span ng-show="node.selected" class="x"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="true"></md-checkbox></span>',
                '<span ng-show="node.__ivhTreeviewIndeterminate" class="y"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
                '<span ng-hide="node.selected || node.__ivhTreeviewIndeterminate"><md-checkbox style="min-height: 100%; line-height: 0" aria-label="checked" ng-checked="false"></md-checkbox></span>',
                '</span>',
            ].join(''),
            link: function(scope, element, attrs, ctrl) {
                element.on('click', function() {
                    ivhTreeviewMgr.select(ctrl.root(), scope.node, !scope.node.selected);
                    scope.$apply();
                });
            }
        };
    }
    return mdBox;
});
