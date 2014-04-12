#AngularJS SharedObject

AngularJS SharedObject module for sharing data between clients using socket.io.


#Examples

Start server with `node index`. It is working on port 8010.

Start demo app with `grunt serve`.

#Using shared object

You need to have angular-socket-wrapper

    angular.module('sharedObjectDemoApp')
        .controller('MainCtrl', function($scope, $sharedObject) {

            $scope.sharedObject = $sharedObject;

        });

This will not work

    // in this moment $sharedObject.someObject is null
    $scope.someObject = $sharedObject.someObject


