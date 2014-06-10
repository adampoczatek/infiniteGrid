(function () {
    "use strict";

    var dataService;

    dataService = function () {
        return {
            setupDataCache: null
        };
    };

    angular.module("infiniteGrid")
        .service("dataService", [dataService]);
})();