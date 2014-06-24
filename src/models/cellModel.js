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