'use strict';

(function() {
	describe('passwordStrength Service Spec', function() {
		// Initialize global variables
		var passwordStrength;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function(_passwordStrength_) {
            passwordStrength = _passwordStrength_;
		}));

		it('should be testable', inject(function() {
			// The test logic
			expect(passwordStrength).toBeDefined();
		}));

		it('should support empty password', function () {
			expect(passwordStrength('')).toEqual(0);
		});
		it('should report bad strength for bad passwords', function () {
			expect(passwordStrength('abc')).toEqual(2);
		});
		it('should report good strength for good passwords', function () {
			expect(passwordStrength('#1234!?AbC')).toEqual(100);
		});
	});
}());