(function() {
   "use strict";

var infiniteGridServices,
    infiniteGridDirectives,
    infiniteGridFilters;

infiniteGridServices    = angular.module("infiniteGrid.Services", []);

infiniteGridDirectives  = angular.module("infiniteGrid.Directives", []);

infiniteGridFilters     = angular.module("infiniteGrid.Filters", []);

angular.module("infiniteGrid", ["infiniteGrid.Services", "infiniteGrid.Directives", "infiniteGrid.Filters"]);

infiniteGridServices
    .service("exampleService", ["$templateCache", function ($templateCache) {
        return {
            log: function (msg) {
                alert($templateCache.get("example.html"));
            }
        }
    }]);

angular.module("infiniteGrid").run(["$templateCache", function($templateCache) {
  'use strict';

  $templateCache.put('example.html',
    "<h1>Heey</h1>"
  );

}]);


})();