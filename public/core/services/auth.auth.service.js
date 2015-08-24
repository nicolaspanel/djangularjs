'use strict';

// Authentication service for user variables
angular.module('core')
    .factory('$auth', function($rootScope, $q, $http) {
		function Authentication(){}

        Authentication.prototype.setLoggedUser = function setLoggedUser(user){
            if (user) {
                this.user = user;
                $rootScope.$emit('logged-in');
            }
        };

        Authentication.prototype.isUserLoggedIn = function () {
            return !!this.user;
        };

		return new Authentication();
	});