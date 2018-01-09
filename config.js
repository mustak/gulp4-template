const _destinationFolder = 'build';
const _src = 'src';
export default {
    PORT: 8000,
    COMPATIBILITY: [
        "last 2 versions",
        "ie >= 9",
        "ios >= 7"
    ],
    UNCSS_OPTIONS: {
        html: ["src/**/*.html"],
        ignore: [
            "!!js/regexp .foundation-mq",
            "!!js/regexp ^\.is-.*"
        ]
    },
    WEBPACKCONFIG: {
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader'
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
                }]
        }
    },
    PATHS: {
        dist: _destinationFolder,
        assets: {
            src: [
                "src/assets/**/*",
                "!src/assets/scss",
                "!src/assets/{images,js,scss}/**/*"
            ],
            dest: _destinationFolder
        },
        sass: {
            resolve: [
                "node_modules/foundation-sites/scss",
                "node_modules/motion-ui/src"
            ],
            watch: 'src/assets/scss/**/*',
            src: 'src/assets/scss/app.scss',
            dest: _destinationFolder + '/css'
        },
        //entries -> scripts
        scripts: {
            watch: 'src/assets/js/**/*',
            src: [
                //"src/assets/js/app.js",
                "src/assets/js/main.ts"
            ],
            dest: _destinationFolder + '/js'
        },
        html: {
            src: ['src/pages/**/*.{html,hbs,handlebars}'],
            dest: _destinationFolder
        },
        images: {
            src: ['src/assets/images/**/*'],
            dest: _destinationFolder + '/images'
        }
    }
}
