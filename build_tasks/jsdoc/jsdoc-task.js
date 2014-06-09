var jsdoc;

jsdoc = {
    dist: {
        src: ["./src/<%= pkg.name %>-<%= pkg.version %>.js"],
        options: {
            destination: "./demo/documentation"
        }
    }
};

module.exports = jsdoc;