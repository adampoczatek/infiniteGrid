(function () {
    "use strict";

    var exampleService;

    exampleService = function () {
        return {
            log: function (msg) {
                window.console.log(msg);

                return msg;
            }
        };
    };

    angular.module("infiniteGrid")
        .service("exampleService", [exampleService]);
})();