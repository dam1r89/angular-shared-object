'use strict';

angular.module('sharedObjectDemoApp')
    .controller('MainCtrl', function($scope, SharedObject) {

        $scope.sharedObject = SharedObject;

        $scope.sharedObject.array = SharedObject.array || [];

    });
