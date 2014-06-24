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