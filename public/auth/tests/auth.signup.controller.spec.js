'use strict';

(function() {
	// Signup Controller Spec
	describe('Signup Controller Tests', function() {
		// Initialize global variables
		var ctrl, scope, $httpBackend, $auth, $location;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _authFakeData_, _$auth_, _$location_) {
			// Set a new global scope
			scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
            $auth = _$auth_;
            $location = _$location_;
			// Initialize the Signup controller.
			ctrl = $controller('SignupController', { $scope: scope });
		}));

		describe('when signup with valid credentials', function () {
			var credentials = {username: 'toto', email:'toto@foo.bar', password: 'pass'};
			var response = {username:'toto',email: 'toto@foo.bar'};

			beforeEach(function(){
				spyOn($auth, 'setLoggedUser').and.returnValue();
				$httpBackend.expectPOST('/signup/', credentials)
					.respond(200, response);
				ctrl.signup(credentials);
				$httpBackend.flush();
			});

			it('should have set logged user', function () {
				expect($auth.setLoggedUser).toHaveBeenCalledWith(response);
			});

			it('should redirect user to home page', function(){
				expect($location.url()).toBe('/');
			});
		});
	});
}());