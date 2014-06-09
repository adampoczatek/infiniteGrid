var html2js;

html2js = {
    options: {
        module: "infiniteGrid.Templates",
        singleModule: true,
        indentString: "    ",
        quoteChar: "\""
    },
    main: {
        src: ["./src/templates/**/*.html"],
        dest: "./src/templates/templates.js"
    }
};

module.exports = html2js;