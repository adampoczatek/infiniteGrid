(function () {
    "use strict";

    var infiniteGrid;

    /**
     * Main table directive.
     * @namespace infiniteGrid.Components.infiniteGridDirective
     */
    infiniteGrid = function (http, templateCache, utilsFactory, dataFactory, Cache, View) {
        var _linkFunction;

        /**
         * Angular link function.
         * @method _linkFunction
         * @private
         */
        _linkFunction = function (scope, element, attr) {
            var _memory,
                _data,
                _settings,
                _validateSettings;

            /**
             * ##################################################
             * Private variables and methods.
             * ##################################################
             */

            _memory = new Cache(scope.columns, scope.rows);

            _data = new View();

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
                    scope.initialised = true;

                    scope.getData(0, 0);
                }
            };

            scope.updateView = function (data) {
                scope.data = data;
            };

            scope.getData = function (columnIndex, rowIndex) {
                var query;

                _settings = {
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                };

                query = _memory.query(columnIndex, rowIndex);

                scope.updateView(query.data);

                if (query.empty.length) {

                    window.console.log("`scope.getData`: Querying empty cells.", query.empty);

                    http
                        .get("/fake-data/data-simple.json")
                        .success(function (result) {
                            _memory.insertData(result);

                            scope.getData(columnIndex, rowIndex);
                        });
                }
            };

            scope.showNextRow = function () {
                scope.getData(_settings.columnIndex, _settings.rowIndex + 1, scope.totalColumns);
            };

            scope.showPrevRow = function () {
                scope.getData(_settings.columnIndex, _settings.rowIndex - 1, scope.totalColumns);
            };

            scope.showNextColumn = function () {
                scope.getData(_settings.columnIndex + 1, _settings.rowIndex);
            };

            scope.showPrevColumn = function () {
                scope.getData(_settings.columnIndex - 1, _settings.rowIndex);
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
        .directive("infiniteGrid", ["$http", "$templateCache", "utilsFactory", "dataFactory", "CacheModel", "ViewModel", infiniteGrid]);
})();