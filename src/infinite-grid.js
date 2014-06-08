(function() {
    "use strict";

    angular.module("infiniteGrid", []);
})();

(function () {
    "use strict";

    var exampleService;

    exampleService = function (scope) {
        return {
            log: function (msg) {
                window.alert(msg);
            }
        };
    };

    angular.module("infiniteGrid")
        .service("exampleService", ["$scope", exampleService]);
})();

angular.module('templates-<%= pkg.name %>', ['templates/example.html']);

angular.module("templates/example.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/example.html",
    "<h1>Heey</h1>");
}]);
