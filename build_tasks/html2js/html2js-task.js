var html2js;

html2js = {
    options: {
        module: "infiniteGrid.Templates",
        singleModule: true,
        indentString: "    ",
        fileHeaderString:
            "(function () {\n" +
            "    \"use strict\";\n",
        fileFooterString:
            "\n})();"
    },
    main: {
        src: ["./src/templates/**/*.html"],
        dest: "./src/templates/templates.js"
    }
};

module.exports = html2js;