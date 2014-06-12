/**
 * infinite-grid - 0.0.0
 * Last updated: 12-06-2014
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

    /**
     * Data service is used to manipulate with data.
     * @namespace infiniteGrid.Services.dataService
     */

    var dataSet = {
        0: {
            columns: {
                0: {
                    value: "James"
                },
                1: {
                    value: null
                },
                2: {
                    value: null
                }
            }
        },
        1: {
            columns: {
                0: {
                    value: "Bruce"
                },
                1: {
                    value: null
                },
                2: {
                    value: "Chris"
                }
            }
        },
        2: {
            columns: {
                0: {
                    value: "Daniel"
                },
                1: {
                    value: "Stuart"
                },
                2: {
                    value: null
                }
            }
        }
    };

    dataService = function (http, utilsService) {
        return {

            /**
             * Sets up data object.
             *
             * @method setup
             * @memberOf infiniteGrid.Services.dataService
             * @param totalColumns
             * @param totalRows
             * @returns {Object}
             */
            setup: function (totalColumns, totalRows) {
                return utilsService.setupDataSetObj(totalColumns, totalRows);
            },

            /**
             * Loops through data object and returns an array of empty cells.
             *
             * @method getEmptyCells
             * @memberOf infiniteGrid.Services.dataService
             * @param {Object} dataSet
             * @returns {Array}
             */
            getEmptyCells: function (dataSet) {
                var result = [];

                // Loop through rows.
                utilsService.loopObj(dataSet, function (rowItem, rowItemKey) {

                    // Loop through columns
                    utilsService.loopObj(rowItem.columns, function (cellItem, cellItemKey) {
                        var item;

                        // If cell doesn't have any data add it to the `results` array.
                        if (!cellItem.value) {
                            item = {};

                            item[rowItemKey] = parseFloat(cellItemKey);

                            result.push(item);
                        }
                    });
                });

                return result;
            },

            /**
             * Queries data from locally stored object.
             *
             * @method queryLocalData
             * @memberOf infiniteGrid.Services.dataService
             * @param {Number} startColumn - First column index.
             * @param {Number} startRow - First row index.
             * @param {Number} columnsCount - Amount of columns to be queried.
             * @param {Number} rowsCount - Amount of rows to be queried.
             * @param {Object} dataSet - Local data object.
             */
            queryLocalData: function (startColumn, startRow, columnsCount, rowsCount, dataSet) {
                var _result,
                    _rowIndex,
                    _rowCached,
                    _rowCachedIndex,
                    _columnIndex,
                    _columnCached,
                    _columnCachedIndex,
                    _emptyColumn;

                // Result object containing cached data and an array of empty cells.
                _result = {
                    cached: {},
                    empty: []
                };


                // Loop through cached rows.
                for (_rowIndex = 0; _rowIndex < rowsCount; _rowIndex++) {

                    _rowCachedIndex = _rowIndex + startRow;

                    _rowCached = dataSet[_rowCachedIndex];

                    // Create empty row object.
                    _result.cached[_rowIndex] = utilsService.createRowObj();

                    // Loop through cached columns.
                    for (_columnIndex = 0; _columnIndex < columnsCount; _columnIndex++) {

                        _columnCachedIndex = _columnIndex + startColumn;

                        _columnCached =
                            _rowCached &&
                            _rowCached.columns &&
                            _rowCached.columns[_columnCachedIndex];

                        if (!_columnCached || !_columnCached.value) {

                            _columnCached = utilsService.createColumnObj();

                            _emptyColumn = {};

                            _emptyColumn[_rowCachedIndex] = _columnCachedIndex;

                            _result.empty.push(_emptyColumn);
                        }

                        _result.cached[_rowIndex].columns[_columnIndex] = _columnCached;
                    }
                }

                return _result;
            },

            /**
             * Merges new data with cached data.
             *
             * @method mergeData
             * @memberOf infiniteGrid.Services.dataService
             * @param {Object} cachedData
             * @param {Object} newData
             */
            mergeData: function (cachedData, newData) {
                var _cachedRow, _cachedColumn;

                utilsService.loopObj(newData, function (item, key) {
                    _cachedRow = cachedData[key];

                    if (!_cachedRow) {
                        _cachedRow = cachedData[key] = utilsService.createRowObj();
                    }

                    utilsService.loopObj(item, function (item, key) {
                        _cachedColumn = _cachedRow.columns[key];

                        if (!_cachedColumn) {
                            _cachedColumn = _cachedRow.columns[key] = utilsService.createColumnObj();
                        }

                        _cachedColumn.value = item.value;
                    });
                });

                return cachedData;
            }
        };
    };

    angular.module("infiniteGrid")
        .service("dataService", ["$http", "utilsService", dataService]);
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
         * Creates columns object.
         *
         * @method _setupColumns
         * @param {Number} columns - Number of columns in the grid.
         * @returns {Object}
         * @private
         */
        _setupColumns = function (columns, columnValue) {
            var i, l, obj;

            obj = {};

            for (i = 0, l = columns; i < l; i++) {
                obj[i] = columnValue;
            }

            return obj;
        };

        /**
         * Sets up rows object.
         *
         * @method _setupRows
         * @param {Number} numberOfRows - Number of rows.
         * @param {*} columnsTemplate - Columns template.
         * @returns {Object}
         * @private
         */
        _setupRows = function (numberOfRows, columnsTemplate) {
            var obj, i, l;

            obj = {};

            for (i = 0, l = numberOfRows; i < l; i++) {
                obj[i] = {
                    columns: _cloneObj(columnsTemplate)
                };
            }

            return obj;
        };

        return {

            /**
             * Creates generic row object.
             *
             * @method createRowObj
             * @memberOf infiniteGrid.Services.utilsService
             * @returns {Object}
             */
            createRowObj: function () {
                return {
                    columns: {}
                };
            },

            /**
             * Creates generic column object.
             *
             * @method createColumnObj
             * @memberOf infiniteGrid.Services.utilsService
             * @returns {Object}
             */
            createColumnObj: function () {
                return {
                    value: null
                };
            },

            /**
             * Sets ups data set object.
             *
             * @method setupDataSetObj
             * @memberOf infiniteGrid.Services.utilsService
             * @param {Number} columns - Number of columns in the grid.
             * @param {Number} rows - Number of rows in the grid.
             * @returns {Object} - Returns template object.
             */
            setupDataSetObj: function (columns, rows) {
                var _ROW,
                    _DATA_SET;

                _ROW = _setupColumns(columns, {
                    value: null
                });

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
            },

            /**
             * Little wrapper around `for in` loop.
             *
             * @param {Object} data - Object to loop through.
             * @param {Function} callback - Function executed on every property.
             */
            loopObj: function (data, callback) {
                var key;

                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        callback.call(data, data[key], key);
                    }
                }
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
    infiniteGrid = function (http, templateCache, utilsService, dataService) {
        var _linkFunction;

        /**
         * Angular link function.
         * @method _linkFunction
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _MEMORY,
                _SETTINGS,
                _validateSettings;

            /**
             * ##################################################
             * Private variables and methods.
             * ##################################################
             */

            _MEMORY = {};

            _SETTINGS = {};

            /**
             * Validate grid settings.
             *
             * @method _validateSettings
             * @param {Number} columns
             * @param {Number} totalColumns
             * @param {Number} rows
             * @param {Number} totalRows
             * @returns {boolean}
             * @private
             */
            _validateSettings = function (columns, totalColumns, rows, totalRows) {
                if (!columns ||
                    !totalColumns ||
                    !rows ||
                    !totalRows ||
                    totalColumns < columns ||
                    totalRows < rows) {

                    return false;
                }

                return true;
            };


            /**
             * ##################################################
             * Public methods.
             * ##################################################
             */


            /**
             * Initialise infinite grid directive.
             */
            scope.initialise = function () {
                var valid;

                valid = _validateSettings(scope.columns, scope.totalColumns, scope.rows, scope.totalRows);

                if (valid) {
                    scope.data = utilsService.setupDataSetObj(scope.columns, scope.rows);

                    scope.initialised = true;

                    scope.getData(0, 0, scope.columns, scope.rows);
                }
            };

            scope.getData = function (columnIndex, rowIndex) {
                var _query;

                _SETTINGS = {
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                };

                _query = dataService.queryLocalData(columnIndex, rowIndex, scope.columns, scope.rows, _MEMORY);

                scope.data = _query.cached;

                if (_query.empty.length) {
                    http
                        .get("/fake-data/data.json")
                        .success(function (result) {
                            _MEMORY = dataService.mergeData(_MEMORY, result);

                            scope.getData(columnIndex, rowIndex);
                        });
                }
            };


            scope.showNextRow = function () {
                scope.getData(_SETTINGS.columnIndex, _SETTINGS.rowIndex + 1, scope.totalColumns);
            };

            scope.showPrevRow = function () {
                scope.getData(_SETTINGS.columnIndex, _SETTINGS.rowIndex - 1, scope.totalColumns);
            };

            scope.showNextColumn = function () {
                scope.getData(_SETTINGS.columnIndex + 1, _SETTINGS.rowIndex);
            };

            scope.showPrevColumn = function () {
                scope.getData(_SETTINGS.columnIndex - 1, _SETTINGS.rowIndex);
            };

            /**
             * ##################################################
             * Events.
             * ##################################################
             */

            scope.$watchCollection("[totalColumns, totalRows]", function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }

                scope.initialise();
            });


            /**
             * ##################################################
             * Initialisation
             * ##################################################
             */

            scope.initialise();
        };

        return {
            link: _linkFunction,
            restrict: "AE",
            scope: {
                columns: "=",
                totalColumns: "=",
                rows: "=",
                totalRows: "="
            },
            template: templateCache.get("templates/grid.tpl.html")
        };
    };

    angular.module("infiniteGrid")
        .directive("infiniteGrid", ["$http", "$templateCache", "utilsService", "dataService", infiniteGrid]);
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
            "</ul>\n" +
            "\n" +
            "<button ng-click=\"showPrevRow();\">Show prev row</button>\n" +
            "<button ng-click=\"showNextRow();\">Show next row</button>\n" +
            "<button ng-click=\"showPrevColumn();\">Show prev column</button>\n" +
            "<button ng-click=\"showNextColumn();\">Show next column</button>");
    }]);
})();