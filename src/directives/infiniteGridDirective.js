(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGrid
     */
    infiniteGrid = function (http, templateCache, utilsService, dataService) {
        var _linkFunction;

        /**
         * Angular link function.
         * @method _linkFunction
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _MEMORY,
                _SETTINGS,
                _validateSettings;

            /**
             * ##################################################
             * Private variables and methods.
             * ##################################################
             */

            _MEMORY = {};

            _SETTINGS = {};

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

                    scope.getData(0, 0, scope.columns, scope.rows);
                }
            };

            scope.getData = function (columnIndex, rowIndex) {
                var _query;

                _SETTINGS = {
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                };

                _query = dataService.queryLocalData(columnIndex, rowIndex, scope.columns, scope.rows, _MEMORY);

                scope.data = _query.cached;

                if (_query.empty.length) {
                    http
                        .get("/fake-data/data.json")
                        .success(function (result) {
                            _MEMORY = dataService.mergeData(_MEMORY, result);

                            scope.getData(columnIndex, rowIndex);
                        });
                }
            };


            scope.showNextRow = function () {
                scope.getData(_SETTINGS.columnIndex, _SETTINGS.rowIndex + 1, scope.totalColumns);
            };

            scope.showPrevRow = function () {
                scope.getData(_SETTINGS.columnIndex, _SETTINGS.rowIndex - 1, scope.totalColumns);
            };

            scope.showNextColumn = function () {
                scope.getData(_SETTINGS.columnIndex + 1, _SETTINGS.rowIndex);
            };

            scope.showPrevColumn = function () {
                scope.getData(_SETTINGS.columnIndex - 1, _SETTINGS.rowIndex);
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
        .directive("infiniteGrid", ["$http", "$templateCache", "utilsService", "dataService", infiniteGrid]);
})();