/**
 * Author: Damir Miladinov
 * Angular SharedObject
 */
(function(window, angular, io, undefined) {
    'use strict';

    angular.module('SharedObject', ['SocketWrapper'])
        .service('$sharedObject', function SharedObject($rootScope, $socket, $log) {
            var scope = $rootScope.$new(),
                dontBroadcast = true;

            scope.so = {};

            scope.$watch('so', function(val) {

                if (dontBroadcast) return;

                $log.log('SharedObject:send', val);
                $socket.$emit('$soData', val);

            }, true);

            $socket.$on('$soData', function(data) {

                scope.so = scope.so || {};

                $log.log('SharedObject:receive', data);

                angular.extend(scope.so, data);

                dontBroadcast = true;
                scope.$apply();
                dontBroadcast = false;

            });

            return scope.so;

        });

})(window, window.angular, window.io);
