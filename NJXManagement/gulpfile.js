var gulp = require("gulp");


function copy_node_modules(cb) {
    return gulp
        .src("node_modules/**")
        .pipe(gulp.dest('wwwroot/node_modules'));

    cb();
}

exports.copy_node_modules = copy_node_modules;
exports.default = copy_node_modules;