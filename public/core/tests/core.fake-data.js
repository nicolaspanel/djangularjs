'use strict';

/**
 * Provide fake data for test purpose
 */
angular.module('core')
    .constant('staticRoot', '/static/')
    .value('coreFakeData', {
        users:  [{
            username: 'user0',
            isLoggedUser: true
        }, {
            username: 'user1',
            isLoggedUser: false
        }]
    })
    .run(function ($auth, coreFakeData) {
        $auth.setLoggedUser(coreFakeData.users[0]);
    });
