'use strict';

angular.module('auth')
	.factory('passwordForgottenModal', function ($modal, staticPath) {

        function PasswordForgottenModal(){}

        PasswordForgottenModal.open = function (options) {
            return $modal.open(angular.extend({
            templateUrl: staticPath('auth/templates/auth.password-forgotten.template.html'),
                controller: 'PasswordForgottenModalController',
                controllerAs: 'ctrl',
                size: 'sm'
            }, options || {}));
        };

        return PasswordForgottenModal;
    })
	.controller('PasswordForgottenModalController', function ($scope, $modalInstance, $http, $translate, $flash, $state) {
        this.sendResetLinkTo = function (email) {
            $http.post('/reset_password/', {email: email})
                .then(function () {
                    $flash.warn($translate.instant('PASSWORD_FORGOTTEN.DONE_WARN'));
                })
                .then($modalInstance.close)
                .then(function () {
                    $state.go('home');
                });
        };
    });
