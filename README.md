# Gulp


#### This is the starting point for new Javascript projects. It requires node.


This project assumes that you are writing with the Angular project, bought should be fairly adaptable to others. It has only been tested on a small scale, but works with what is there. It may need (and probably needs) to be adjusted to each project. Also, there is a high chance that it needs to be more flexible at it's base, but guess what? Someone else cares more than me! ...sorry for the outburst...it's been a long month.


Technologies include:

- Gulp
- Angular
- Browserify
- Babelify (Babel for Browserify,requires babel-preset-es2015 and babel-preset-angular)
- Jade Templates
- Sass
- Connect (for and easy static local server with livereload)
- Uglify
- Imagemin


**Browserify, Babelify, and the babel-presets** weren't playing well with npm install
*They may need to be installed separately*


The `gulp` command will compile to the **Test/** directory, for processed, but unminified code. This allows for easier debugging.
`gulp build` will compile minified code and images to the **Web/** directory for faster production speeds.
