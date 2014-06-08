var jshint;

jshint = {
    options: {
        jshintrc: true
    },
    main: {
        src: [
            "<%= pkg.name %>.js"
        ]
    }
};

module.exports = jshint;