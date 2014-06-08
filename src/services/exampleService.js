(function () {
    "use strict";

    var exampleService;

    exampleService = function (scope) {
        return {
            log: function (msg) {
                window.alert(msg);
            }
        };
    };

    angular.module("infiniteGrid")
        .service("exampleService", ["$scope", exampleService]);
})();