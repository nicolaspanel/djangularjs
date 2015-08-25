'use strict';

(function() {
	describe('Password forgotten Modal Controller Tests', function() {

		var ctrl, scope, fakeModal, $httpBackend;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $fakeModal, _authFakeData_) {
			scope = $rootScope.$new();
            fakeModal = $fakeModal.$new();

			$httpBackend = _$httpBackend_;
			ctrl = $controller('PasswordForgottenModalController', {
				$scope: scope,
				$modalInstance: fakeModal
			});
		}));

        describe('scope', function () {
            it('should be usable', function() {
                expect(scope).toBeDefined();
            });
        });

        describe('modal', function () {
            it('should be usable', function() {
                expect(fakeModal).toBeDefined();
            });
        });

        describe('controller', function () {
            describe('when reset succeeded', function () {
                beforeEach(function(){
                    spyOn(fakeModal, 'close').and.returnValue();
                    var email = 'foo@bar.com';
                    $httpBackend.expectPOST('/reset_password/', {email: email}).respond(200, {});
                    ctrl.sendResetLinkTo(email);
                    $httpBackend.flush();
                });
                it('should close the modal', function () {
                    expect(fakeModal.close).toHaveBeenCalled();
                });
            });
        });

	});
}());
