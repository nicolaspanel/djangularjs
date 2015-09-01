'use strict';

var ApplicationConfiguration = (function() {
    var APP_NAME= 'app';
	return {
		name: APP_NAME,
		dependencies: [
            'ngResource', 'ngCookies',  'ngAnimate', 'ngMessages',
            'ngTouch',  'ngSanitize',  'ui.router', 'ui.router.title', 'angular-loading-bar',
            'ui.bootstrap', 'angularMoment', 'restangular',
           'pascalprecht.translate', 'angular-toolbox'
        ],
		registerModule:  function(moduleName, dependencies) {
            // Create angular module
            var module = angular.module(moduleName, dependencies || []);

            // Add the module to the AngularJS configuration file
            angular.module(APP_NAME).requires.push(moduleName);
            return module;
        }
	};
})();


angular.module(ApplicationConfiguration.name, ApplicationConfiguration.dependencies)
    .config(function($httpProvider){
        // django and angular both support csrf tokens. This tells angular which cookie to add to what header.
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    })
    .config(function(RestangularProvider) {
        RestangularProvider.setRequestSuffix('/');
	})
    .config(function ($translateProvider) {
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useMessageFormatInterpolation();
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.determinePreferredLanguage();
    })
    .config(function($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {

        // Setting HTML5 Location Mode
		$locationProvider.hashPrefix('!');

        function unauthorizedInterceptor($q, $window) {
            return {
                responseError: function(rejection) {
                    switch (rejection.status) {
                        case 401:
                        case 403:
                            $window.location.href = '/'; // Redirect to signin page
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        }
        // Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(unauthorizedInterceptor);

        // ROUTES
        // -- Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
	});

angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	// bootstrap the app
	angular.bootstrap(document, [ApplicationConfiguration.name]);
});