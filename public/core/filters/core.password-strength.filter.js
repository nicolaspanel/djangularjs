'use strict';

angular.module('core').filter('passwordStrength',
	function(passwordStrength) {
		return passwordStrength; // see services
	});