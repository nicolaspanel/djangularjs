'use strict';

angular.module('core')
	.filter('passwordStrengthStatus', function (passwordStrength) {
		return function(pwd, minStrength, goodStrength){
			minStrength = minStrength || 0;
			goodStrength = goodStrength || 75;
			var pwdStrength = passwordStrength(pwd);
			if (pwdStrength < minStrength){
				return 'danger';
			}
			else if (pwdStrength >= goodStrength){
				return 'success';
			}
			else {
				return 'warning';
			}
		};
	})
	.directive('passwordStrength',
	function($log, passwordStrength, staticPath) {
		return {
			require: 'ngModel',
			templateUrl: staticPath('core/templates/core.password-strength.template.html'),
			restrict: 'E',
            replace: true,
			scope: {
				minStrength: '@',
				placeholder: '@'
			},
			link: function postLink(scope, element, attrs, ngModel) {
				// Add directive's logic here
				var minStrength =  scope.$eval(attrs.minStrength) || 0;

				ngModel.$validators.strength = function (pwd) {
                    return passwordStrength(pwd) >= minStrength;
                };

				ngModel.$render = function() {
                    scope.password = ngModel.$modelValue;
                };

				scope.$watch('password', function (pwd) {
					ngModel.$setViewValue(pwd);
				});
			}
		};
	});
