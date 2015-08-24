'use strict';

angular.module('core')
    .factory('$flash', function($rootScope, format) {
        /**
         * Flash service.
         * @example
         * @return
         */
        var DEFAULTS = {
            duration: 3000, //ms
            type: 'danger'
        };

        var LEVELS = {
            debug:  'default',
            info:  'success',
            warn: 'warning',
            error:  'danger'
        };

        function Flash(){ }

        angular.forEach(LEVELS, function (value, key) {
            Flash.prototype[key] = function(msg, duration){
                var flash = angular.extend({}, DEFAULTS, {
                    duration: duration || DEFAULTS.duration,
                    type: value || DEFAULTS.type,
                    msg: msg,
                    level: key
                });

                $rootScope.$emit(format('flash-{}', key), flash);
            };
        });

        return new Flash();
	}
);