var gulp = require('gulp');
var webpack = require('webpack-stream');
var path = require('path');
var browserSync = require('browser-sync').create();

var paths = {
    root: './',
    dist: './dist/',
    src:  './src/'
};

gulp.task('watch:vanila', function () {
    gulp.src("./test/index.html").pipe(gulp.dest(paths.dist+"vanila/"));
    browserSync.init({
        open: true,
        port: 8081,
        server: {
            baseDir: "./dist/vanila",
        }
    });

    // gulp.watch("app/**/*.js").on('change', browserSync.reload);
    gulp.watch(paths.src+'**/*.js',["js:vanilla"]).on('change', browserSync.reload);
});

gulp.task('js:vanilla', function () {
    return gulp.src(path.join(paths.src + 'vanila/vanilaVirtualList.js'))
        .pipe(webpack({
            output: {
                library:       'virtualList',
                libraryTarget: 'umd',
                filename:      'vanilaVirtualList.js'
            }
        }))
        .pipe(gulp.dest(paths.dist+"vanila/"));
});

gulp.task('js:react', function () {
    return gulp.src(path.join(paths.src, 'virtualList.react.js'))
        .pipe(webpack({
            output:    {
                library:       'virtualList',
                libraryTarget: 'umd',
                filename:      'virtualList-react.js'
            },
            module:    {
                loaders: [
                    {
                        test:    /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader:  'babel',
                        query:   {
                            presets: ['es2015', 'react', 'stage-0']
                        }
                    }
                ]
            },
            externals: [
                {
                    'react':     {
                        root:      'React',
                        commonjs2: 'react',
                        commonjs:  'react',
                        amd:       'react'
                    },
                    'react-dom': {
                        root:      'ReactDOM',
                        commonjs2: 'react-dom',
                        commonjs:  'react-dom',
                        amd:       'react-dom'
                    }
                }
            ]
        }))
        .pipe(gulp.dest(paths.dist));
});