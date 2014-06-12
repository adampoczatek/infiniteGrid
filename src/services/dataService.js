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