'use strict';

angular.module('sharedObjectDemoApp')
    .service('SharedObject', function SharedObject(Socket, $rootScope) {
        var scope = $rootScope.$new(),
            dontBroadcast = true;

        scope.sharedObject = {};


        Socket.connect().then(onConnect);

        function onConnect(socket) {
            scope.$watch('sharedObject', function(val) {
                if (dontBroadcast) return;
                socket.emit('data', val);
            }, true);

            socket.on('data', function(data) {
                scope.sharedObject = scope.sharedObject || {};


                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        scope.sharedObject[key] = shallowClearAndCopy(data[key], scope.sharedObject[key]);
                    } else {
                        delete scope.sharedObject[key];
                    }
                }

                console.log('getting', data);

                dontBroadcast = true;
                scope.$apply();
                dontBroadcast = false;

            });
        }


        function shallowClearAndCopy(src, dst) {

            if (!angular.isObject(src)) return src;

            dst = dst || {};

            angular.forEach(dst, function(value, key) {
                delete dst[key];
            });

            for (var key in src) {
                if (src.hasOwnProperty(key) && key.charAt(0) !== '$' && key.charAt(1) !== '$') {
                    dst[key] = src[key];
                }
            }

            return dst;
        }


        return scope.sharedObject;

    });
