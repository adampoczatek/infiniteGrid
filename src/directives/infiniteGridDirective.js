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