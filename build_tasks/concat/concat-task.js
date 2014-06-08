var concat;

concat = {
    options: {
        separator: "\n\n"
    },

    dev: {
        src: ["<%= srcFiles %>"],
        dest: "./src/<%= pkg.name %>.js"
    },

    demo: {
        src: ["<%= srcFiles %>"],
        dest: "./demo/infinite-grid/<%= pkg.name %>.js"
    }
};

module.exports = concat;