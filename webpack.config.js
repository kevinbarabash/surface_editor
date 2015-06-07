module.exports = {
    entry: "./webgl/lesson_01.js",
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader" },
            { test: /\.json$/, loader: "json-loader" },
            { test: /\.glsl$/, loader: "raw" }
        ]
    }
};
