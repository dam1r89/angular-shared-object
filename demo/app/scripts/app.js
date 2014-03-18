'use strict';

angular.module('sharedObjectDemoApp', ['SharedObject'])
        .config(function($socketProvider){

            $socketProvider.options({
                port: 8010
            });
        });
