var uglify;

uglify = {
    dist: {
        files: {
            "./src/<%= pkg.name %>-<%= pkg.version %>.min.js": "./src/<%= pkg.name %>-<%= pkg.version %>.js"
        }
    }
};

module.exports = uglify;