var gulp = require('gulp'),
	jspm = require('jspm'),
	rename = require('gulp-rename'),
	template = require('gulp-template'),
	uglify = require('gulp-uglify'),
	htmlreplace = require('gulp-html-replace'),
	ngAnnotate = require('gulp-ng-annotate'),
	serve = require('browser-sync'),
	yargs = require('yargs').argv;

var path = require('path');
var cp = require('child_process');

var root = 'client';

// helper method to resolveToApp paths
var resolveTo = function (resolvePath) {
	return function (glob) {
		glob = glob || '';
		return path.join(root, resolvePath, glob);
	}
};

var resolveToApp = resolveTo('app'); // app/{glob}
var resolveToComponents = resolveTo('app/components'); // app/components/{glob}

// map of all our paths
var paths = {
	// All typescript settings
	ts: {
		// all typescript that we want to vet
		// allts: [
		//     './src/**/*.ts',
		//     './*.ts'
		// ],
		clientts: [
			resolveToApp('**/*.ts')
		],
		serverts: [
			'./server/**/*.ts'
		]
		// output: '.tmp'
	},
	js: resolveToApp('**/*.js'),
	css: resolveToApp('**/*.css'),
	html: [
		resolveToApp('**/*.html'),
		path.join(root, 'index.html')
	],
	blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
	dist: path.join(__dirname, 'dist/')
};

gulp.task('serve',['ts-watcher'], function () {
	serve({
		port: process.env.PORT || 3000,
		open: false,
		files: [].concat(
			[paths.js],
			[paths.css],
			paths.html
			),
		server: {
			baseDir: root,
			// serve our jspm dependencies with the client folder
			routes: {
				'/jspm.config.js': './jspm.config.js',
				'/jspm_packages': './jspm_packages'
			}
		},
	});
});

gulp.task('build', function () {
	var dist = path.join(paths.dist + 'app.js');
	// Use JSPM to bundle our app
	return jspm.bundleSFX(resolveToApp('app'), dist, {})
		.then(function () {
			// Also create a fully annotated minified copy
			return gulp.src(dist)
				.pipe(ngAnnotate())
				.pipe(uglify())
				.pipe(rename('app.min.js'))
				.pipe(gulp.dest(paths.dist))
		})
		.then(function () {
			// Inject minified script into index
			return gulp.src('client/index.html')
				.pipe(htmlreplace({
					'js': 'app.min.js'
				}))
				.pipe(gulp.dest(paths.dist));
		});
});

gulp.task('component', function () {
	var cap = function (val) {
		return val.charAt(0).toUpperCase() + val.slice(1);
	};

	var name = yargs.name;
	var parentPath = yargs.parent || '';
	var destPath = path.join(resolveToComponents(), parentPath, name);

	return gulp.src(paths.blankTemplates)
		.pipe(template({
			name: name,
			upCaseName: cap(name)
		}))
		.pipe(rename(function (path) {
			path.basename = path.basename.replace('temp', name);
		}))
		.pipe(gulp.dest(destPath));
});

/**
 * Watch TypeScript and recompile
 */
gulp.task('ts-watcher', ['ts-watcher-client'/*, 'ts-watcher-server'*/]);

gulp.task('ts-watcher-client', function () {
    gulp.watch(paths.ts.clientts, ['tsc-client']);
});

// gulp.task('ts-watcher-server', function () {
//     gulp.watch(paths.ts.serverts, ['tsc-server']);
// });

/**
 * Compiles *.js files, sourcemaps,
 */
gulp.task('tsc', ['tsc-client'/*, 'tsc-server'*/]);

gulp.task('tsc-client', function(done) {
    runTSC('./', done);
});

// gulp.task('tsc-server', function(done) {
//     runTSC('server', done);
// });


gulp.task('default', ['tsc','serve'])


// utils
function runTSC(directory, done) {
	directory = directory || './';
    var tsc = path.join(process.cwd(), 'node_modules/typescript/bin/tsc');
    var childProcess = cp.spawn('node', [tsc, '-p', directory], { cwd: process.cwd() });
    childProcess.stdout.on('data', function (data) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.stderr.on('data', function (data) {
        // Ticino will read the output
        console.log(data.toString());
    });
    childProcess.on('close', function () {
        done();
    });
}