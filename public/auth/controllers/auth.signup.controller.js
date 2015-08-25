'use strict';
/**
 * Signup controller
 *
 * Associated view: public/`auth/views/auth.signup.view.html`
 */
angular.module('auth').controller('SignupController',
	function($scope, $auth, $state, $flash, $translate, $http) {

        this.signup = function (credentials) {
            if ($scope.signupForm && $scope.signupForm.$invalid){
                $scope.signupForm.$showErrors = true;
                return;
            }
            $http.post('/signup/', credentials)
                .success(function (response) {
                    $auth.setLoggedUser(response);
                    $state.go('home');
                })
                .error(function () {
                    $flash.error($translate.instant('SIGN_UP.BAD_CREDENTIALS'));
                    $scope.credentials = {};
                });
        };
	});
