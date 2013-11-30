"use strict";

module.exports = function(grunt) {
  // Project configuration.
    grunt.initConfig({

        // Config stuff
        project: {
            javascript: {
                ts: ['source/js/app.ts', 'source/js/**/*.ts'],
                lib: [
                    'source/bower_components/jquery/jquery.js',
                    'source/bower_components/angular/angular.js',
                    'source/bower_components/angular-touch/angular-touch.js',
                    'source/bower_components/angular-animate/angular-animate.js',
                    'source/bower_components/angular-resource/angular-resource.js',
                    'source/bower_components/angular-route/angular-route.js',
                    'xsource/bower_components/**/*.min.js',
                    'source/geo/geo.js'
                ]
            },
            pkg: grunt.file.readJSON('./package.json')
        },
        less: {
            build: {
                files: {
                    "app/css/style.css": "source/less/main.less"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    },
                    pretty: true
                },
                files: {
                    "app/index.html": ["source/jade/index.jade"],
                    "app/templates/states/main.html": ["source/jade/templates/states/main.jade"],
                    "app/templates/states/about.html": ["source/jade/templates/states/about.jade"],
                    "app/templates/directives/address-detail.html": ["source/jade/templates/directives/address-detail.jade"]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ['**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true,
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade'],
                options: {
                    nospawn: true,
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['default']
            },
            typescript: {
                files: ['**/*.ts'], 
                tasks: ['typescript'],
                options: {
                    nospawn: true,
                }
            },
            javascriptLib: {
                files: '<%= project.javascript.lib %>',
                tasks: ['jshint', 'concat']
            }
        },
        concat: {
            javascript_lib: {
                src: '<%= project.javascript.lib %>',
                dest: 'app/js/lib.js'
            }
        },
        concurrent: {
            target: {
                tasks: ['watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        typescript: {
            base: {
                src: ['source/js/app.ts', 'source/js/**/*.ts'],
                dest: 'app/js/main.js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourcemap: true,
                    noImplicitAny: true,
                    comments: false
                }
            }
        }
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['less', 'typescript', 'concat', 'jade', 'concurrent']);
};