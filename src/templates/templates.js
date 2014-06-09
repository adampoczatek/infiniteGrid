(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/example.html",
            "<h1>Heey</h1>");
        $templateCache.put("templates/example2.html",
            "<h1>Heey 2</h1>");
    }]);
})();