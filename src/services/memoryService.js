(function () {
    "use strict";

    var memoryService;

    memoryService = function (utilsService) {
        return {



            initialise: function (totalColumns, totalRows) {
               // _DATA = utilsService.setupDataSetObj(totalColumns, totalRows);
            }
        };
    };

    angular.module("infiniteGrid")
        .service("memoryService", ["utilsService", memoryService]);
})();