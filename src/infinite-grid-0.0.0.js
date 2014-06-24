/**
 * infinite-grid - 0.0.0
 * Last updated: 24-06-2014
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
     * Contains all infiniteGrid services.
     * @namespace infiniteGrid.Factories
     */

    /**
     * Contains all infiniteGrid services.
     * @namespace infiniteGrid.Models
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

    var dataFactory;

    /**
     * Data service is used to manipulate with data.
     * @namespace infiniteGrid.Factories.dataFactory
     */
    dataFactory = function (http, utilsFactory) {
        return {

            /**
             * Sets up data object.
             *
             * @method setup
             * @memberOf infiniteGrid.Factories.dataFactory
             * @param totalColumns
             * @param totalRows
             * @returns {Object}
             */
            setup: function (totalColumns, totalRows) {
                return utilsFactory.setupDataSetObj(totalColumns, totalRows);
            },

            /**
             * Loops through data object and returns an array of empty cells.
             *
             * @method getEmptyCells
             * @memberOf infiniteGrid.Factories.dataFactory
             * @param {Object} dataSet
             * @returns {Array}
             */
            getEmptyCells: function (dataSet) {
                var result = [];

                // Loop through rows.
                utilsFactory.loopObj(dataSet, function (rowItem, rowItemKey) {

                    // Loop through columns
                    utilsFactory.loopObj(rowItem.columns, function (cellItem, cellItemKey) {
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
             * @memberOf infiniteGrid.Factories.dataFactory
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
                    _result.cached[_rowIndex] = utilsFactory.createRowObj();

                    // Loop through cached columns.
                    for (_columnIndex = 0; _columnIndex < columnsCount; _columnIndex++) {

                        _columnCachedIndex = _columnIndex + startColumn;

                        _columnCached =
                            _rowCached &&
                            _rowCached.columns &&
                            _rowCached.columns[_columnCachedIndex];

                        if (!_columnCached || !_columnCached.value) {

                            _columnCached = utilsFactory.createColumnObj();

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
             * @memberOf infiniteGrid.Factories.dataFactory
             * @param {Object} cachedData
             * @param {Object} newData
             */
            mergeData: function (cachedData, newData) {
                var _cachedRow, _cachedColumn;

                utilsFactory.loopObj(newData, function (item, key) {
                    _cachedRow = cachedData[key];

                    if (!_cachedRow) {
                        _cachedRow = cachedData[key] = utilsFactory.createRowObj();
                    }

                    utilsFactory.loopObj(item, function (item, key) {
                        _cachedColumn = _cachedRow.columns[key];

                        if (!_cachedColumn) {
                            _cachedColumn = _cachedRow.columns[key] = utilsFactory.createColumnObj();
                        }

                        _cachedColumn.value = item.value;
                    });
                });

                return cachedData;
            }
        };
    };

    angular.module("infiniteGrid")
        .service("dataFactory", ["$http", "utilsFactory", "CellModel", dataFactory]);
})();

(function () {
    "use strict";

    var utilsFactory;

    /**
     * Utilities service contains commonly used methods.
     * @namespace infiniteGrid.Factories.utilsFactory
     */
    utilsFactory = function (Cell) {
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
         * @param {*} columnValue - Value that goes into the column.
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
             * @memberOf infiniteGrid.Factories.utilsFactory
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
             * @memberOf infiniteGrid.Factories.utilsFactory
             * @returns {Object}
             */
            createColumnObj: function () {
                return new Cell();
            },

            /**
             * Sets ups data set object.
             *
             * @method setupDataSetObj
             * @memberOf infiniteGrid.Factories.utilsFactory
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
             * @memberOf infiniteGrid.Factories.utilsFactory
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
        .service("utilsFactory", ["CellModel", utilsFactory]);
})();

(function () {
    "use strict";

    var CacheModel;

    CacheModel = function (Row, Cell, utils) {
        var Cache;

        /**
         * Describes Cache model.
         *
         * @method Cache
         * @namespace infiniteGrid.Models.Cache
         * @param {Number} rowsCount - Number of rows displayed in the UI.
         * @param {Number} columnsCount - Number of columns displayed in the UI.
         * @param {Array} frozenColumns - An array of frozen rows.
         * @param {Array} frozenRows - An array of frozen columns.
         * @constructor
         */
        Cache = function (rowsCount, columnsCount, frozenColumns, frozenRows) {
            this.data = {};

            this.rowsCount = rowsCount;

            this.columnsCount = columnsCount;

//            if (!(frozenColumns instanceof Array)) {
//                frozenColumns = false;
//            }
//
//            this.frozenColumns = frozenColumns;
//
//            if (!(frozenRows instanceof Array)) {
//                frozenRows = false;
//            }
//
//            this.frozenRows = frozenRows;
        };

        /**
         * Inserts data into the cache.
         *
         * @method insertData
         * @memberOf infiniteGrid.Models.Cache
         * @param {Object} data - Raw data object.
         * @returns {Cache}
         * @example
         * var cache, data;
         *
         * data = {
         *     0: {
         *         0: "Row 1 - Cell 1",
         *         1: "Row 1 - Cell 2",
         *         2: "Row 1 - Cell 3"
         *     },
         *     1: {
         *         0: "Row 2 - Cell 1",
         *         1: "Row 2 - Cell 2",
         *         2: "Row 2 - Cell 3"
         *     }
         * };
         *
         * cache = new Cache();
         *
         * cache.insertData(data);
         */
        Cache.prototype.insertData = function (data) {
            var self;

            self = this;

            utils.loopObj(data, function (item, key) {
                var row, rowIndex;

                rowIndex = parseFloat(key);

                row = self.data[rowIndex];

                if (!(row instanceof Row)) {
                    row = self.data[rowIndex] = new Row();
                }

                row.insertCells(item);
            });

            return this;
        };

        /**
         * Queries data from the cache.
         *
         * @method query
         * @memberOf infiniteGrid.Models.Cache
         * @returns {{data: Object, empty: Array}}
         */
        Cache.prototype.query = function (startColumn, startRow) {
            var result,
                rowIndex,
                rowCached,
                rowCachedIndex,
                columnIndex,
                columnCached,
                columnCachedIndex,
                emptyColumn,
                rowsCount,
                columnsCount;

            rowsCount = this.rowsCount;

            columnsCount = this.columnsCount;

            result = {
                data: {},
                empty: []
            };

            for (rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
                rowCachedIndex = rowIndex + startRow;

                rowCached = this.data[rowCachedIndex];

                result.data[rowIndex] = new Row();

                for (columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                    columnCached = null;

                    columnCachedIndex = columnIndex + startColumn;

                    if (rowCached instanceof Row) {
                        columnCached = rowCached.getCell(columnCachedIndex);
                    }

                    if (!columnCached) {
                        columnCached = new Cell();

                        emptyColumn = {};

                        emptyColumn[columnCachedIndex] = rowCachedIndex;

                        result.empty.push(emptyColumn);
                    }

                    result.data[rowIndex].insertCell(columnIndex, columnCached);
                }
            }

            return result;
        };

        return Cache;
    };

    angular.module("infiniteGrid")
        .service("CacheModel", ["RowModel", "CellModel", "utilsFactory", CacheModel]);
})();

(function () {
    "use strict";

    var CellModel;

    CellModel = function () {
        var Cell;

        /**
         * Describes Cell model.
         *
         * @method Cell
         * @namespace infiniteGrid.Models.Cell
         * @constructor
         */
        Cell = function (value, frozen, template) {
            this.value = value;

            this.frozen = false;

            this.template = template;

            if (typeof frozen === "boolean") {
                this.frozen = frozen;
            }
        };

        /**
         * Check if the instance has value.
         *
         * @method hasValue
         * @memberOf infiniteGrid.Models.Cell
         * @returns {Boolean}
         */
        Cell.prototype.hasValue = function () {
            if (typeof this.value === "number") {
                return true;
            }
            else {
                return !!this.value;
            }
        };

        /**
         * Sets value on the cell.
         *
         * @method setValue
         * @memberOf infiniteGrid.Models.Cell
         * @param {*} newValue - Value that will appear on the cell.
         * @returns {Cell}
         */
        Cell.prototype.setValue = function (newValue) {
            this.value = newValue;

            return this;
        };

        /**
         * Retrieves cell value.
         *
         * @method getValue
         * @memberOf infiniteGrid.Models.Cell
         * @returns {Cell.value}
         */
        Cell.prototype.getValue = function () {
            return this.value;
        };

        /**
         * Freezes the column.
         *
         * @method freeze
         * @memberOf infiniteGrid.Models.Cell
         * @param {Boolean} freeze
         * @returns {Boolean}
         */
        Cell.prototype.freeze = function (freeze) {
            if (typeof freeze === "boolean") {
                this.frozen = freeze;

                return this.frozen;
            }

            throw new Error("`freeze` parameter must be a boolean.");
        };

        /**
         * Checks if cell is frozen.
         *
         * @method isFrozen
         * @memberOf infiniteGrid.Models.Cell
         * @returns {Boolean}
         */
        Cell.prototype.isFrozen = function () {
            if (typeof this.frozen === "boolean") {
                return this.frozen;
            }

            return false;
        };

        /**
         * Renders cell.
         *
         * @method render
         * @memberOf infiniteGrid.Models.Cell
         * @returns {*} Value that will be displayed in the UI.
         */
        Cell.prototype.render = function () {
            /**
             * Todo: include Angular templates
             */
            return this.getValue();
        };

        return Cell;
    };

    angular.module("infiniteGrid")
        .service("CellModel", [CellModel]);
})();

(function () {
    "use strict";

    var RowModel;

    RowModel = function (Cell, utils) {
        var Row;

        /**
         * Describes Cell model.
         *
         * @method Row
         * @namespace infiniteGrid.Models.Row
         * @param {boolean=} frozen - Indicate whether the row is frozen or not.
         * @constructor
         */
        Row = function (frozen) {
            this.cells = {};

            this.frozen = false;

            if (typeof frozen === "boolean") {
                this.frozen = frozen;
            }
        };

        /**
         * Inserts new cell into row.
         *
         * @method insertCell
         * @memberOf infiniteGrid.Models.Row
         * @param {Number} cellIndex - Position in the `Row` collection.
         * @param {Cell} cellInstance - Instance of Cell class that will be stored in the collection.
         * @returns {Row}
         */
        Row.prototype.insertCell = function (cellIndex, cellInstance) {
            if (typeof cellIndex !== "number" ||
                cellIndex !== cellIndex) {

                throw new Error("`cellIndex` parameter isn't a number.");
            }

            if (!(cellInstance instanceof Cell)) {
                throw new Error("`cellInstance` parameter isn't an instance of Cell class.");
            }

            this.cells[cellIndex] = cellInstance;

            return this;
        };

        /**
         * Inserts multiple cell instances using raw data.
         *
         * @method insertCells
         * @memberOf infiniteGrid.Models.Row
         * @param {Object} data - Raw data object.
         * @returns {Row}
         * @example
         * var row, data;
         *
         * data = {
         *     0: "Row 1 - Cell 1",
         *     1: "Row 1 - Cell 2",
         *     2: "Row 1 - Cell 3"
         * };
         *
         * row = new Row();
         *
         * row.insertCells(data);
         */
        Row.prototype.insertCells = function (data) {
            var self;

            self = this;

            utils.loopObj(data, function (item, key) {
                var cell, cellIndex;

                cell = new Cell(item);

                cellIndex = parseFloat(key);

                self.insertCell(cellIndex, cell);
            });

            return this;
        };

        /**
         * Inserts multiple cell instances using raw data.
         *
         * @method removeCell
         * @memberOf infiniteGrid.Models.Row
         * @param {Number} cellIndex - Cell position.
         * @returns {Row}
         */
        Row.prototype.removeCell = function (cellIndex) {
            if (typeof cellIndex !== "number" ||
                cellIndex !== cellIndex) {

                throw new Error("`cellIndex` is not a number");
            }

            this.cells[cellIndex] = null;

            return this;
        };

        /**
         * Retrieves cell by index.
         *
         * @method getCell
         * @memberOf infiniteGrid.Models.Row
         * @param {Number} cellIndex - Cell index.
         * @returns Cell if one exists.
         */
        Row.prototype.getCell = function (cellIndex) {
            if (typeof cellIndex !== "number" ||
                cellIndex !== cellIndex) {

                throw new Error("`cellIndex` is not a number.");
            }

            return this.cells[cellIndex];
        };

        /**
         * Freezes row.
         *
         * @method freeze
         * @memberOf infiniteGrid.Models.Row
         * @param {Boolean} freeze - Indicate whether to freeze the row or not.
         * @returns {Row}
         */
        Row.prototype.freeze = function (freeze) {
            if (typeof freeze === "boolean") {
                this.frozen = freeze;

                return this.frozen;
            }

            throw new Error("`freeze` parameter must be a boolean.");
        };

        return Row;
    };

    angular.module("infiniteGrid")
        .service("RowModel", ["CellModel", "utilsFactory", RowModel]);
})();

(function () {
    "use strict";

    var ViewModel;

    ViewModel = function () {
        var View;

        /**
         * Describes View model.
         *
         * @method View
         * @namespace infiniteGrid.Models.ViewModel
         * @constructor
         */
        View = function () {
            this.data = {};
        };

        /**
         * Inserts data into the
         */
        View.prototype.update = function (data) {
            this.data = data;
        };

        return View;
    };

    angular.module("infiniteGrid")
        .service("ViewModel", [ViewModel]);
})();

(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGridDirective
     */
    infiniteGrid = function (http, templateCache, utilsFactory, dataFactory, Cache, View) {
        var _linkFunction;

        /**
         * Angular link function.
         * @method _linkFunction
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _memory,
                _data,
                _settings,
                _validateSettings;

            /**
             * ##################################################
             * Private variables and methods.
             * ##################################################
             */

            _memory = new Cache(scope.columns, scope.rows);

            _data = new View();

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
                    scope.initialised = true;

                    scope.getData(0, 0);
                }
            };

            scope.updateView = function (data) {
                scope.data = data;
            };

            scope.getData = function (columnIndex, rowIndex) {
                var query;

                _settings = {
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                };

                query = _memory.query(columnIndex, rowIndex);

                scope.updateView(query.data);

                if (query.empty.length) {

                    window.console.log("`scope.getData`: Querying empty cells.", query.empty);

                    http
                        .get("/fake-data/data-simple.json")
                        .success(function (result) {
                            _memory.insertData(result);

                            scope.getData(columnIndex, rowIndex);
                        });
                }
            };

            scope.showNextRow = function () {
                scope.getData(_settings.columnIndex, _settings.rowIndex + 1, scope.totalColumns);
            };

            scope.showPrevRow = function () {
                scope.getData(_settings.columnIndex, _settings.rowIndex - 1, scope.totalColumns);
            };

            scope.showNextColumn = function () {
                scope.getData(_settings.columnIndex + 1, _settings.rowIndex);
            };

            scope.showPrevColumn = function () {
                scope.getData(_settings.columnIndex - 1, _settings.rowIndex);
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
        .directive("infiniteGrid", ["$http", "$templateCache", "utilsFactory", "dataFactory", "CacheModel", "ViewModel", infiniteGrid]);
})();

(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/grid.tpl.html",
            "<ul class=\"infinite-grid\">\n" +
            "    <li class=\"infinite-grid__row\"\n" +
            "        ng-class=\"{ 'infinite-grid__row--freeze': row.isFrozen() }\"\n" +
            "        ng-repeat=\"row in data\">\n" +
            "\n" +
            "        <div class=\"infinite-grid__column\"\n" +
            "             ng-class=\"{ 'infinite-grid__column--freeze': cell.isFrozen() }\"\n" +
            "             ng-repeat=\"cell in row.cells\">\n" +
            "\n" +
            "            {{cell.render()}}\n" +
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