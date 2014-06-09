/**
 * infinite-grid - 0.0.0
 * Last updated: 09-06-2014
 * @summary Infinite Grid
 * @author Adam Poczatek (@ad4z)
 */

(function() {
    "use strict";

    /**
     * infiniteGrid base namespace.
     * @namespace infiniteGrid
     */

    /**
     * Contains all infiniteGrid services.
     * @namespace infiniteGrid.Services
     */

    /**
     * Contains all infiniteGrid filters.
     * @namespace infiniteGrid.Filters
     */

    /**
     * Contains all infiniteGrid components.
     * @namespace infiniteGrid.Components
     */

    angular.module("infiniteGrid", ["infiniteGrid.Templates"]);
})();

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

(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/example.html",
            "<h1>Heey</h1>");
        $templateCache.put("templates/example2.html",
            "<h1>Heey 2</h1>");
    }]);
})();