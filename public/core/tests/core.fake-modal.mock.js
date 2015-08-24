'use strict';

angular.module('core')
    .factory('$fakeModal', function ($q, $rootScope) {
        // see https://docs.angularjs.org/api/ng/service/$q
        function FakeModal(){
            this._resultDeferred = $q.defer();
            this._openedDeferred = $q.defer();
            this._renderedDeferred = $q.defer();
            this.result = this._resultDeferred.promise;
            this.opened = this._openedDeferred.promise;
            this.rendered = this._renderedDeferred.promise;
        }
        FakeModal.prototype.open = function(options){
            this._openedDeferred.resolve();
            this._renderedDeferred.resolve();
            // Propagate promise resolution to 'then' functions using $apply().
            $rootScope.$apply();
            return this;
        };
        FakeModal.prototype.close = function (value) {
            this._resultDeferred.resolve(value);
            $rootScope.$apply();
        };
        FakeModal.prototype.dismiss = function (reason) {
            this._resultDeferred.reject(reason);
            $rootScope.$apply();
        };

        FakeModal.$new = function $newFakeModal() { return new FakeModal(); };

        return FakeModal;
    });