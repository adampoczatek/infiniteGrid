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

    dataService = function (utilsService) {
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
             * @param {Number} startColumn - First column index.
             * @param {Number} startRow - First row index.
             * @param {Number} columnsCount - Amount of columns to be queried.
             * @param {Number} rowsCount - Amount of rows to be queried.
             * @param {Object} dataSet - Local data object.
             */
            queryLocalData: function (startColumn, startRow, columnsCount, rowsCount, dataSet) {
                var result, rowIndex, rows, cachedRow, cachedCell, columnIndex, columns, emptyCell;

                result = {
                    cached: {},
                    empty: []
                };

                // Loop through cached rows.
                for (rowIndex = 0, rows = rowsCount; rowIndex < rows; rowIndex++) {
                    cachedRow = dataSet[startRow + rowIndex];

                    result.cached[rowIndex] = { columns: {} };

                    // Loop through cached columns.
                    for (columnIndex = 0, columns = columnsCount; columnIndex < columns; columnIndex++) {
                        cachedCell =
                            cachedRow &&
                            cachedRow.columns[startColumn + columnIndex];

                        if (!cachedCell || !cachedCell.value) {
                            cachedCell = {
                                value: null
                            };

                            emptyCell = {};

                            emptyCell[startRow + rowIndex] = startColumn + columnIndex;

                            result.empty.push(emptyCell);
                        }

                        result.cached[rowIndex].columns[columnIndex] = cachedCell;
                    }
                }

                return result;
            }
        };
    };

    angular.module("infiniteGrid")
        .service("dataService", ["utilsService", dataService]);
})();