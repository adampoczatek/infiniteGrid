var jshint;

jshint = {
    options: {
        jshintrc: true
    },
    main: {
        src: [
            "./src/**/*.js",
            "!./src/<%= pkg.name %>-<%= pkg.version %>.js",
            "!./src/<%= pkg.name %>-<%= pkg.version %>.min.js"
        ]
    }
};

module.exports = jshint;