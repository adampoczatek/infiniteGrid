infiniteGridServices
    .service("exampleService", ["$templateCache", function ($templateCache) {
        return {
            log: function (msg) {
                alert($templateCache.get("example.html"));
            }
        }
    }]);