module.exports = function (grunt) {
    var matchdep =  require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        srcFiles: [
            "./src/base.js",
            "./src/filters/*.js",
            "./src/services/*.js",
            "./src/directives/*.js",

            "<%= ngtemplates.infiniteGrid.dest %>"
        ],
        templates: [
            "./src/templates/*.html"
        ],

        clean:          require("./build_tasks/clean/task.js"),
        concat:         require("./build_tasks/concat/concat-task.js"),
        connect:        require("./build_tasks/connect/connect-task.js"),
        jsdoc:          require("./build_tasks/jsdoc/task.js"),
        karma:          require("./build_tasks/karma/task.js"),
        ngtemplates:    require("./build_tasks/ng-templates/ng-templates-task.js"),
        watch:          require("./build_tasks/watch/task.js")
    });

    grunt.registerTask("start", ["connect"]);
};