'use strict';

angular.module('core').directive('flash',
	function() {
		return {
			template: '' +
            '<div class="flash center-block text-center" ng-show="alerts.length > 0">' +
            '   <alert ng-repeat="alert in alerts" ' +
            '          type="{{alert.type}}" close="flashCtrl.closeAlert(alert)">' +
            '       <span ng-bind-html="::alert.msg"><span>' +
            '   </alert>' +
            '</div>',
			restrict: 'E',
            replace:true,
            scope: true,
            controllerAs: 'flashCtrl',
            controller: function ($scope, $attrs, $rootScope, $timeout, format) {
                var LEVELS = {debug:0, info:1, warn:2, error:3};
                var self = this;
                $scope.alerts = [];

                var minLevel = LEVELS.info;
                if ($attrs.minLevel){
                    var expected = $scope.$eval($attrs.minLevel);
                    minLevel = LEVELS[expected] || minLevel;
                }

                function display(event, flash){
                    if (LEVELS[flash.level] < minLevel){
                        return; // ignored
                    }
                    flash.timeout = $timeout(function () {
                        self.closeAlert(flash);
                    }, flash.duration);

                    $scope.alerts.push(flash);
                }

                this.closeAlert = function (flash) {
                    $timeout.cancel(flash.timeout);
                    $scope.alerts = _.without($scope.alerts, flash);
                };
                // subscribe to root scope events
                _.forOwn(LEVELS, function(value, key){
                    $rootScope.$on(format('flash-{}', key), display);
                });
            }
		};
	}
);