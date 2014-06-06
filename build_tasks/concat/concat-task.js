var concat;

concat = {
    options: {
        banner:
            "(function() {\n" +
            "   \"use strict\";\n\n",
        footer:
            "\n\n})();",
        separator: "\n\n"
    },

    dev: {
        src: ["<%= srcFiles %>"],
        dest: "<%= pkg.name %>.js"
    },

    demo: {
        src: ["<%= srcFiles %>"],
        dest: "./demo/infinite-grid/<%= pkg.name %>.js"
    }
};

module.exports = concat;