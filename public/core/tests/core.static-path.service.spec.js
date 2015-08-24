'use strict';

(function() {
	describe('staticPath Service Spec', function() {
		// Initialize global variables
		var staticPath;

		beforeEach(module(ApplicationConfiguration.name));

		beforeEach(inject(function(_staticPath_) {
            staticPath = _staticPath_;
		}));

		it('should be testable', inject(function() {
			// The test logic
			expect(staticPath).toBeDefined();
		}));
	});
}());