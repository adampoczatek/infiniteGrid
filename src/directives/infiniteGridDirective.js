(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGrid
     */
    infiniteGrid = function (templateCache, utilsService, dataService) {
        var _linkFunction;

        /**
         * Angular link function.
         * @method _linkFunction
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _MEMORY,
                _DATA_OBJ,
                _validateSettings;


            var test = dataService.queryLocalData(1, 1, 2, 2, {
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
            });

            /**
             * ##################################################
             * Private variables and methods.
             * ##################################################
             */

            _MEMORY = {};

            _DATA_OBJ = {};

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
                }
            };

            scope.getData = function () {

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
        .directive("infiniteGrid", ["$templateCache", "utilsService", "dataService", infiniteGrid]);
})();