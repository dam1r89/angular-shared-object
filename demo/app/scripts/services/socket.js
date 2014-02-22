'use strict';

angular.module('sharedObjectDemoApp')
    .factory('Socket', function Socket($q, $rootScope, $location) {
        var host = $location.protocol() + ':\\' + $location.host(),
            options = {
                'force new connection': true,
                port: 8010
            }
        return {
            connect: function() {
                var deferred = $q.defer();

                var socket = io.connect(host, options);
                socket.on('connect', function() {
                    $rootScope.$apply(function() {
                        deferred.resolve(socket);
                    });
                });
                return deferred.promise;
            }
        }

    });
