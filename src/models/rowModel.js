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