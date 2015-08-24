'use strict';

angular.module('core').controller('HeaderController',
    function($scope, $auth, $state) {

        angular.extend($scope, {
            $auth: $auth,
            $state: $state
        });

		// Collapsing the menu after navigation
		//$scope.$on('$stateChangeSuccess', function() {
		//	$scope.isCollapsed = false;
		//});
	}
);