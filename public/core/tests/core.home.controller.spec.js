'use strict';

(function() {
	describe('HomeController', function() {
		//Initialize global variables
		var scope,
			HomeController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			HomeController = $controller('HomeController', {
				$scope: scope
			});
		}));

		describe('scope', function () {
            it('should expose $auth service', function () {
                expect(scope.$auth).toBeDefined();
            });
            it('should expose features catalogue', function () {
                expect(scope.featuresCatalogue).toBeDefined();
            });
        });
	});
})();