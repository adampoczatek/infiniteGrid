(function() {
    "use strict";

    angular.module('infiniteGrid.Templates', []).run(['$templateCache', function($templateCache) {
        $templateCache.put("templates/grid.tpl.html",
            "<ul class=\"infinite-grid\">\n" +
            "    <li class=\"infinite-grid__row\"\n" +
            "        ng-class=\"{ 'infinite-grid__row--freeze': row.isFrozen() }\"\n" +
            "        ng-repeat=\"row in data\">\n" +
            "\n" +
            "        <div class=\"infinite-grid__column\"\n" +
            "             ng-class=\"{ 'infinite-grid__column--freeze': cell.isFrozen() }\"\n" +
            "             ng-repeat=\"cell in row.cells\">\n" +
            "\n" +
            "            {{cell.render()}}\n" +
            "        </div>\n" +
            "    </li>\n" +
            "</ul>\n" +
            "\n" +
            "<button ng-click=\"showPrevRow();\">Show prev row</button>\n" +
            "<button ng-click=\"showNextRow();\">Show next row</button>\n" +
            "<button ng-click=\"showPrevColumn();\">Show prev column</button>\n" +
            "<button ng-click=\"showNextColumn();\">Show next column</button>");
    }]);
})();