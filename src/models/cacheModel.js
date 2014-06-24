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