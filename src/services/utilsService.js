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