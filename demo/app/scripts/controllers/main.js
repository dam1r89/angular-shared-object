'use strict';

angular.module('sharedObjectDemoApp')
    .controller('MainCtrl', function($scope, $sharedObject) {

        $scope.sharedObject = $sharedObject;

        $scope.sharedObject.array = $sharedObject.array || [];

    });
