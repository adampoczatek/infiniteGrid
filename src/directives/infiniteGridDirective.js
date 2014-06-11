(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGrid
     */
    infiniteGrid = function (templateCache, utilsService, memoryService) {
        var _linkFunction;

        /**
         * Angular link function.
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _MEMORY;

            scope.$watch("columns", function (newVal, oldVal) {

                scope.data = utilsService.setupDataSetObj(scope.columns, scope.rows);
            });

            scope.initialise = function (totalColumns, totalRows) {
                _MEMORY = utilsService.setupDataSetObj(totalColumns, totalRows);


            };

            scope.memory = _MEMORY;

            scope.data = utilsService.setupDataSetObj(scope.columns, scope.rows);
        };

        return {
            link: _linkFunction,
            restrict: "AE",
            scope: {
                rows: "=",
                totalRows: "=",
                columns: "=",
                totalColumns: "="
            },
            template: templateCache.get("templates/grid.tpl.html")
        };
    };

    angular.module("infiniteGrid")
        .directive("infiniteGrid", ["$templateCache", "utilsService", "memoryService", infiniteGrid]);
})();