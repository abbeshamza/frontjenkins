/**
 * This file defines the list of controllers, directives and services of project module
 *
 * @param {controller} projectControllers
 * @param {route} projectRoutes
 * @param {directive} projectDirectives
 * @returns {String}
 */

define([
    "./project.routes",
    "./project.controllers",
    "./project.factories",
    "./project.directives",

], function (projectRoutes,projectControllers,projectFactories,projectDirectives) {
    'use strict';
    angular.module("project", [projectRoutes,projectControllers,projectFactories,projectDirectives]);
    return "project";
});

