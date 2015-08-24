'use strict';

angular.module('core').controller('HomeController',
	function($scope, $auth, featuresCatalogue) {
        _.extend($scope, {
			$auth:$auth,
            featuresCatalogue: featuresCatalogue
		});
	});
