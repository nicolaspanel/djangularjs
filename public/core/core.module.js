'use strict';

ApplicationConfiguration.registerModule('core');
angular.module('core')
    .config(function(staticRoot, $stateProvider){
        /**
         * PROJECT ROUTES
         *
         * Use `yo djangularjs:angular-route <route-name>` to create new routes
         *
         * NOTE: routes are centralized here to make sure they are processed in the right order
         **/
        var staticPath = function (path) {return staticRoot + path; };
		$stateProvider
            .state('home', {  // main page once logged in
                url: '/',
                templateUrl: staticPath('core/views/core.home.view.html'),
                controller: 'HomeController as ctrl',
                resolve: {
                }
            })
            .state('signin', {
                url: '/signin',
                templateUrl: staticPath('auth/views/auth.signin.view.html'),
                controller: 'SigninController as ctrl',
                resolve: {
                    // Optional: inject stuffs into SigninController from here
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: staticPath('auth/views/auth.signup.view.html'),
                controller: 'SignupController as ctrl',
                resolve: {
                    // Optional: inject stuffs into SignupController from here
                }
            })
            /* leave me here */;
    })
    .run(function ($rootScope, $log, format) {
        $rootScope.$on('$stateChangeError',  function(event, toState, toParams, fromState, fromParams, error){
            $log.warn(format('Cannot navigate from {} to {}.\nError: {}', fromState.url, toState.url, error));
        });
    });
