/**
 * infinite-grid - 0.0.0
 * Last updated: 10-06-2014
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

(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGrid
     */

    infiniteGrid = function (templateCache) {
        var linkFunction;

        /**
         * Angular link function.
         * @private
         */
        linkFunction = function (scope, elem, attr) {

        };

        return {
            scope: {
                data: "="
            },
            link: linkFunction,
            restrict: "A",
            template: templateCache.get("templates/grid.tpl.html")
        };
    };

    angular.module("infiniteGrid")
        .directive("infiniteGrid", ["$templateCache", infiniteGrid]);
})();

(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/grid.tpl.html",
            "<ul class=\"infinite-grid\">\n" +
            "    <li class=\"infinite-grid__row\"\n" +
            "        ng-repeat=\"row in data\">\n" +
            "\n" +
            "        <div class=\"infinite-grid__column\"\n" +
            "             ng-repeat=\"column in row\">\n" +
            "\n" +
            "            {{column.data}}\n" +
            "        </div>\n" +
            "    </li>\n" +
            "</ul>");
    }]);
})();