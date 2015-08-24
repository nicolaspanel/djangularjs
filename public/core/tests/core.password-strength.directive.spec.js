'use strict';

(function() {
    describe('password-strength directive', function () {
        beforeEach(module(ApplicationConfiguration.name));

        var scope, $elt;

        beforeEach(inject(function($rootScope, _$compile_){
            scope = $rootScope.$new();
            _.extend(scope, {
                myPassword: 'p@ssword'
            });
            var element = angular.element(
                '<password-strength ng-model="myPassword"></password-strength>'
            );
            $elt = _$compile_(element)(scope);
            scope.$digest(); // call watchers
        }));

        it('should be usable', function(){
            expect($elt).toExist();
        });

    });
})();