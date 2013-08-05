"use strict";

module.exports = function (grunt) {
    ["grunt-browserify",
     "grunt-contrib-stylus",
     "grunt-contrib-uglify",
     "grunt-concurrent",
     "grunt-contrib-watch",
     "grunt-contrib-jshint"].forEach(grunt.loadNpmTasks);

    var browserifyFiles = { "www/bundle.js": ["lib/entry.js"] };
    var uglifyFiles = { "www/bundle.js": ["www/bundle.js"] };
    var stylusFiles = { "www/bundle.css": ["styles/reset.css", "styles/*.styl"] };

    grunt.initConfig({
        jshint: {
            files: "lib/**/*.js",
            options: { jshintrc: ".jshintrc" }
        },
        browserify: {
            dist: {
                files: browserifyFiles,
                options: { debug: false }
            },
            dev: {
                files: browserifyFiles,
                options: { debug: true }
            }
        },
        uglify: {
            dist: { files: uglifyFiles }
        },
        stylus: {
            dist: {
                files: stylusFiles,
                options: { compress: true, linenos: false }
            },
            dev: {
                files: stylusFiles,
                options: { compress: false, linenos: true }
            }
        },
        concurrent: {
            js: ["browserify:dev", "jshint"],
            dev: ["stylus:dev", "browserify:dev", "jshint"],
            dist: ["stylus:dist", "browserify:dist"]
        },
        watch: {
            options: { nospawn: true, interrupt: true, atBegin: true },
            scripts: {
                files: ["lib/**/*.js", "node_modules/*/package.json", ".jshintrc"],
                tasks: ["concurrent:js"]
            },
            styles: {
                files: ["styles/**/*.css", "styles/**/*.styl"],
                tasks: ["stylus:dev"]
            }
        }
    });

    grunt.registerTask("dev", ["concurrent:dev"]);
    grunt.registerTask("dist", ["concurrent:dist", "uglify:dist"]);
};
