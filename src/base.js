var infiniteGridServices,
    infiniteGridDirectives,
    infiniteGridFilters;

infiniteGridServices    = angular.module("infiniteGrid.Services", []);

infiniteGridDirectives  = angular.module("infiniteGrid.Directives", []);

infiniteGridFilters     = angular.module("infiniteGrid.Filters", []);

angular.module("infiniteGrid", ["infiniteGrid.Services", "infiniteGrid.Directives", "infiniteGrid.Filters"]);