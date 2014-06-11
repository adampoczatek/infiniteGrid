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

    var dataService;

    dataService = function () {
        return {
            setupDataCache: null
        };
    };

    angular.module("infiniteGrid")
        .service("dataService", [dataService]);
})();

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

(function () {
    "use strict";

    var utilsService;

    /**
     * Utilities service contains commonly used methods.
     * @namespace infiniteGrid.Services.utilsService
     */

    utilsService = function () {
        var _setupColumns,
            _setupRows,
            _cloneObj;

        _cloneObj = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        };

        /**
         * Creates
         *
         * @param {Number} rows - Number of rows in the grid.
         * @param {Number} columns - Number of columns in the grid.
         * @returns {{}}
         * @private
         */
        _setupColumns = function (columns) {
            var i, l, obj;

            obj = {};

            for (i = 0, l = columns; i < l; i++) {
                obj[i] = {
                    data: null
                };
            }

            return obj;
        };

        _setupRows = function (rows, rowTemplate) {
            var obj, i, l;

            obj = {};

            for (i = 0, l = rows; i < l; i++) {
                obj[i] = {
                    columns: _cloneObj(rowTemplate)
                };
            }

            return obj;
        };

        return {

            /**
             * Sets ups data set object.
             *
             * @method setupDataSetObj
             * @memberOf infiniteGrid.Services.gridService
             * @param {Number} columns - Number of columns in the grid.
             * @param {Number} rows - Number of rows in the grid.
             * @returns {Object} - Returns template object.
             */
            setupDataSetObj: function (columns, rows) {
                var _ROW,
                    _DATA_SET;

                _ROW = _setupColumns(columns);

                _DATA_SET = _setupRows(rows, _ROW);

                return _DATA_SET;
            },

            /**
             * Creates a clone of an object.
             *
             * @method cloneObject
             * @memberOf infiniteGrid.Services.utilsService
             * @param {Object} obj - Object that will be cloned.
             * @returns {Object} - Copy of the `obj` parameter.
             */
            cloneObject: function (obj) {
                return _cloneObj(obj);
            }
        };
    };

    angular.module("infiniteGrid")
        .service("utilsService", [utilsService]);
})();

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

(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/grid.tpl.html",
            "<ul class=\"infinite-grid\">\n" +
            "    <li class=\"infinite-grid__row\"\n" +
            "        ng-class=\"{ 'infinite-grid__row--freeze': row.freeze }\"\n" +
            "        ng-repeat=\"row in data\">\n" +
            "\n" +
            "        <div class=\"infinite-grid__column\"\n" +
            "             ng-class=\"{ 'infinite-grid__column--freeze': column.freeze }\"\n" +
            "             ng-repeat=\"column in row.columns\">\n" +
            "\n" +
            "            {{column.value}}\n" +
            "        </div>\n" +
            "    </li>\n" +
            "</ul>");
    }]);
})();