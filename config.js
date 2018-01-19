const _destinationFolder = 'build';
const _src = 'src';
export default {
    PORT: 8080,
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
            src: 'src/assets/scss/app.scss',
            dest: _destinationFolder + '/css',
            resolve: [
                "node_modules/foundation-sites/scss",
                "node_modules/motion-ui/src"
            ],
            watch: 'src/assets/scss/**/*'
        },
        //entries -> scripts
        scripts: {
            src: [
                //"src/assets/js/app.js",
                "src/assets/js/main.ts"
            ],
            dest: _destinationFolder + '/js',
            watch: 'src/assets/js/**/*'
        },
        html: {
            src: ['src/html/pages/**/*.{html,hbs,handlebars}'],
            dest: _destinationFolder,
            paniniInit: {
                root: 'src/html/pages/',
                layouts: 'src/html/layouts/',
                partials: 'src/html/partials/',
                data: 'src/html/data/',
                helpers: 'src/html/helpers/'
            },
            watch: 'src/html/{layouts,partials,data,helpers}/**/*.html'
        },
        images: {
            src: ['src/assets/images/**/*'],
            dest: _destinationFolder + '/images'
        }
    }
}
