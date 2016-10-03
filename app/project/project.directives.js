
define([
    "./directives/fileModel",
    "./directives/mdBox",
    "./directives/hcPie"

], function (fileModelDirective,mdBoxDIrective,hcPieDirective) {
    'use strict';
    var directiveModuleName = "project.directives";
    angular.module(directiveModuleName, [])
        .directive("fileModel", fileModelDirective)
        .directive("mdBox",mdBoxDIrective)
        .directive("hcPie",hcPieDirective);
    return directiveModuleName;
});