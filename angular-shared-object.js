/**
 * Author: Damir Miladinov
 * Angular SharedObject
 */
(function(window, angular, io, undefined) {
    'use strict';

    angular.module('SharedObject', [])
        .value('options', {
            'force new connection': true,
            port: 8010
        })
        .service('$sharedObject', function SharedObject($rootScope, $location, options) {
            var scope = $rootScope.$new(),
                dontBroadcast = true,
                host = $location.protocol() + ':\\' + $location.host(),
                socket = io.connect(host, options);


            scope.so = {};


            socket.on('connect', onConnect);

            function onConnect() {

                scope.$watch('so', function(val) {
                    if (dontBroadcast) return;
                    socket.emit('$soData', val);
                }, true);

                socket.on('$soData', function(data) {
                    scope.so = scope.so || {};


                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            scope.so[key] = shallowClearAndCopy(data[key], scope.so[key]);
                        } else {
                            delete scope.so[key];
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


            return scope.so;

        });

})(window, window.angular, window.io);
