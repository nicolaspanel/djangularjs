'use strict';

angular.module('core').directive('featureItem',
	function(staticPath) {
		return {
			templateUrl: staticPath('core/templates/core.feature-item.template.html'),
			restrict: 'E',
            replace: true,
			scope: {
				feature: '='
			}
		};
	});