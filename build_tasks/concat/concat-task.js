var concat;

concat = {
    options: {
        separator: "\n\n"
    },

    templates: {
        options: {
            banner:
                "(function() {\n" +
                "    \"use strict\";\n\n",
            footer:
                "})();"
        },
        src: ["./src/templates/templates.js"],
        dest: "./src/templates/templates.js"
    },

    dev: {
        options: {
            banner:
                "/**\n" +
                " * <%= pkg.name %> - <%= pkg.version %>\n" +
                " * Last updated: <%= grunt.template.today('dd-mm-yyyy') %>\n" +
                " * @summary <%= pkg.description %>\n" +
                " * @author <%= pkg.author %>\n" +
                " */\n\n"
        },
        src: ["<%= srcFiles %>"],
        dest: "./src/<%= pkg.name %>-<%= pkg.version %>.js"
    }
};

module.exports = concat;