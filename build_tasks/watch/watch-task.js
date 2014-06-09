var watch;

watch = {
    scripts: {
        files: [
            "./src/**/*.*",
            "!./src/templates/**/*.js",
            "!./src/<%= pkg.name %>-<%= pkg.version %>.js",
            "!./src/<%= pkg.name %>-<%= pkg.version %>.min.js"
        ],
        tasks: ["build"]
    }
};

module.exports = watch;