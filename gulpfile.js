const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const browserSync = require('browser-sync').create();
 


function style(){
    	return (
        	gulp
		//This is the location that we want gulp to look in and watch for sass changes 

        	//.src("testFiles/*.scss"); 
        	.src("./*.scss")
 
        	// Use sass with the files found, and log any errors
        	.pipe(sass())
        	.on("error", sass.logError)

		.pipe(postcss( [ cssnano() ] ))
 
        	// What is the destination for the compiled file?
        	//.pipe(gulp.dest("testFiles"))
        	.pipe(gulp.dest("./"))

		// Stream changes to browser
		.pipe(browserSync.stream())
	);

}




function watch(){
	browserSync.init({
		// This would tell browsersync where to serve files from
		/*server: {
			baseDir: './'
		},*/
		browser: [ 
			"google chrome", 
			"firefox", 
			"safari" 
		],
		// If you need to change or add a localhost:[port], do so here
		proxy: "localhost",
	});

    	// Watch SCSS files for changes then apply style function if one occurs
    	gulp.watch('./*.scss', style);

	// Watch HTML for browsersync
    	gulp.watch('./*.html').on('change', browserSync.reload);

	// Watch JS for browsersycb
	//gulp.watch('./*.js').on('change', browserSync.reload);
}
    




exports.watch = watch;
exports.style = style;




// Partial directions from https://www.youtube.com/watch?v=QgMQeLymAdU
