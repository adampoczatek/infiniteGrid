(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/grid.tpl.html",
            "<ul class=\"infinite-grid\">\n" +
            "    <li class=\"infinite-grid__row\"\n" +
            "        ng-repeat=\"row in data\">\n" +
            "\n" +
            "        <div class=\"infinite-grid__column\"\n" +
            "             ng-repeat=\"column in row\">\n" +
            "\n" +
            "            {{column.data}}\n" +
            "        </div>\n" +
            "    </li>\n" +
            "</ul>");
    }]);
})();