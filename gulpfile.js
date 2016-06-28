var gulp = require('gulp'),
// transpile es2015
    babelify = require('babelify'),
// static server, 8000 for "test, 4000 for "web"
    connect = require('gulp-connect'),
// HTML templating preprocessor
    jade = require('gulp-jade'),
// CSS preprocessor
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
// puts JS files the proper place for test
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
// minify assets
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');


// connect task
gulp.task('connect', function () {
    connect.server({
        root: 'test',
        port: 8000,
        livereload: true
    });
});

gulp.task('babel-browserify', function () {
    //Grabs the app.js file
    return browserify(['./app/app.js', './app/assets/js/site.js'])
        .bundle()
        .pipe(source('scripts.js'))
        // saves it to the public/js/ directory
        .pipe(gulp.dest('./test/assets/js'))
        .pipe(connect.reload());
});

// gulp.task('sass', function () {
//     return gulp.src('./app/assets/sass/**/*.sass')
//         .pipe(sass({
//             includePaths: ['main'].concat(bourbon)
//         }))
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./test/assets/css'))
//         .pipe(gulp.dest('./web/assets/css'))
//         .pipe(connect.reload());
// });

gulp.task('sass', function(){
  gulp.src('./app/assets/sass/**/*.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      style: 'compressed',
      quiet: true
    }))
    .pipe(gulp.dest('./test/assets/css'))
    .pipe(gulp.dest('./web/assets/css'))
});

gulp.task('jade', function () {
    return gulp.src('./app/jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./test/'))
        .pipe(connect.reload());
});


gulp.task('imagemin', function () {
    return gulp.src(['./app/assets/images/*'])
    .pipe(imagemin({progressive: true, optimizationLevel: 7}))
    .pipe(gulp.dest('./test/assets/images/'));
});

gulp.task('watch', function () {
    gulp.watch('./app/assets/sass/**/*.scss', ['sass']);
    gulp.watch('./app/jade/**/index.jade', ['jade']);
    gulp.watch('./app/**/*.js', ['babel-browserify']);
});

gulp.task('default', ['sass', 'jade', 'babel-browserify', 'imagemin', 'connect', 'watch']);


////////////////////////////////////////////////////////////////
////////////////////// Build Tasks /////////////////////////////
////////////////////////////////////////////////////////////////

/*
******* These are for minifying and moving to the Web directory,
******* which is intended to be the live version ******
*/


gulp.task('minify:build', function () {
    return gulp.src(['./test/assets/js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./web/assets/js/'));
});

gulp.task('imagemin:build', function () {
    return gulp.src(['./app/assets/images/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./web/assets/images/'));
});

gulp.task('jade:build', function () {
    return gulp.src('./app/jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./web/'))
        .pipe(connect.reload());
});

gulp.task('sass:build', function () {
    return gulp.src('./app/assets/sass/**/*.sass')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./web/assets/css'))
        .pipe(connect.reload());
});

gulp.task('connect:build', function () {
    connect.server({
        root: 'web',
        port: 4000,
        livereload: true
    });
});

gulp.task('build', ['minify:build', 'imagemin:build', 'sass:build', 'jade:build', 'connect:build']);



////////////////////////////////////////////////////////////////////////////////
///////////////////// Task Graveyard ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/***
******* I think I've declared this currently useless
******* but potentially useful later.
******* I mostly don't want to be wrong and have to set them up again.
******* They have value
***/
// npm install --save-dev gulp-babel
// babel = require('gulp-babel')
// gulp.task('babel', function () {
//     return gulp.src(['app/main.js', './app/app.js', './app/assets/js/controllers/*.js', 'app/**/*.js'])
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('./test/assets/js'));
// });
//
// npm install --save-dev gulp-concat
// var concat = require('gulp-concat')
// gulp.task('concat', ['babel-browserify'], function () {
//   // babel and concat js, same file as building
//   gulp.src(['./test/assets/js/**/*.js', './test/assets/js/app.js'])
//       .pipe(concat('scripts.js'))
//       .pipe(gulp.dest('./test/assets/js/'))
//       .pipe(connect.reload());
// });
