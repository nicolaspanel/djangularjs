'use strict';

(function() {
	// Signin Controller Spec
	describe('Signin Controller Tests', function() {
		// Initialize global variables
		var ctrl, scope, $httpBackend, fakeModal, $auth, $location;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, $fakeModal, _$httpBackend_, _authFakeData_, _$auth_, _$location_) {
			// Set a new global scope
			scope = $rootScope.$new();
			$httpBackend = _$httpBackend_;
			$auth = _$auth_;
			$location = _$location_;
			fakeModal = $fakeModal.$new();
			// Initialize the Signin controller.
			ctrl = $controller('SigninController', {
				$scope: scope,
				passwordForgottenModal: fakeModal
			});
		}));

		describe('when show "passwordForgottenModal"', function(){
			beforeEach(function () {
				ctrl.showForgottenPasswordModal();
			});
			it('should set "modalOpened" flag to true', function () {
				expect(scope.modalOpened).toBeTruthy();
			});
			describe('once modal closed', function () {
				beforeEach(function () {
					fakeModal.close();
				});
				it('should set "modalOpened" flag to false', function () {
					expect(scope.modalOpened).toBeFalsy();
				});
			});
			describe('once modal dismissed', function () {
				beforeEach(function () {
					fakeModal.dismiss();
				});
				it('should set "modalOpened" flag to false', function () {
					expect(scope.modalOpened).toBeFalsy();
				});
			});
		});

		describe('when signin with valid credentials', function () {
			var credentials = {username: 'toto', password: 'pass'};
			var response = {username:'toto',email: 'toto@foo.bar'};
			beforeEach(function(){
				spyOn($auth, 'setLoggedUser').and.returnValue();
				$httpBackend.expectPOST('/signin/', credentials)
					.respond(200, response);
				ctrl.signin(credentials);
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
