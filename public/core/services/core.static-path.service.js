'use strict';

angular.module('core')
    .factory('staticPath', function(staticRoot) {
        return function(path){
            return  (staticRoot || '/static/') + path;
        };
	})
    .filter('staticPath', function (staticPath) {
        return function(path){
            return staticPath(path);
        };
    });