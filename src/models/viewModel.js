(function () {
    "use strict";

    var ViewModel;

    ViewModel = function () {
        var View;

        /**
         * Describes View model.
         *
         * @method View
         * @namespace infiniteGrid.Models.ViewModel
         * @constructor
         */
        View = function () {
            this.data = {};
        };

        /**
         * Inserts data into the
         */
        View.prototype.update = function (data) {
            this.data = data;
        };

        return View;
    };

    angular.module("infiniteGrid")
        .service("ViewModel", [ViewModel]);
})();