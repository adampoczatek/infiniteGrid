var copy;

copy = {
    main: {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    "./src/<%= pkg.name %>-<%= pkg.version %>.js",
                    "./src/<%= pkg.name %>-<%= pkg.version %>.min.js"
                ],
                dest: "./demo/<%= pkg.name %>/"
            }
        ]
    }
};

module.exports = copy;