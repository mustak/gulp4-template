module.exports = {
    // entry: "./src/assets/js/main.ts",
    // output: {
    //     filename: "main.js",
    //     path: __dirname + "/dist"
    // },

    // devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'awesome-typescript-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            { 
                enforce: "pre", 
                test: /\.ts$/, 
                loader: "source-map-loader" 
            }
        ]//rules
    }//module
};