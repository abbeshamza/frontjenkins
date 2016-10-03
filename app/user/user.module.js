/**
 * This file defines the list of controllers, directives and services of project module
 *
 * @param {controller} projectControllers
 * @param {route} projectRoutes
 * @param {directive} projectDirectives
 * @returns {String}
 */

define([
    "./user.routes",
    "./user.controllers",
    "./user.factories",
    "./user.config"

], function (userRoutes,userControllers,userFactories,userConfig) {
    'use strict';
   angular.module("user", [userRoutes,userControllers,userFactories,userConfig]);

    return "user";
});

