module.exports = function (grunt) {
    var matchdep;

    matchdep = require("matchdep");

    matchdep.filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        srcFiles: [
            "./src/base/base.js",
            "./src/filters/*.js",
            "./src/services/*.js",
            "./src/factories/*.js",
            "./src/models/*.js",
            "./src/directives/*.js",
            "./src/templates/*.js"
        ],

        clean:   require("./build_tasks/clean/clean-task.js"),
        concat:  require("./build_tasks/concat/concat-task.js"),
        connect: require("./build_tasks/connect/connect-task.js"),
        copy:    require("./build_tasks/copy/copy-task.js"),
        html2js: require("./build_tasks/html2js/html2js-task.js"),
        indent:  require("./build_tasks/indent/indent-task.js"),
        jsdoc:   require("./build_tasks/jsdoc/jsdoc-task.js"),
        jshint:  require("./build_tasks/jshint/jshint-task.js"),
        uglify:  require("./build_tasks/uglify/uglify-task.js"),
        watch:   require("./build_tasks/watch/watch-task.js")
    });

    grunt.registerTask("start", [
        "build",
        "connect",
        "watch"
    ]);

    grunt.registerTask("compile-templates", [
        "html2js",
        "indent",
        "concat:templates"
    ]);

    grunt.registerTask("build", [
        "clean:documentation",
        "compile-templates",
        "concat:dev",
        "jshint",
        "uglify",
        "copy",
        "jsdoc"
    ]);
};