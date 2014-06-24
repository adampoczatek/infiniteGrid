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