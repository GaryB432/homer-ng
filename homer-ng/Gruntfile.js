module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: ['app/js/**/*.ts'],
                dest: 'app/js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: 'app/js',
                    sourcemap: true,
                    noImplicitAny: true
                }
            },
            dist: {
                src: ['app/js/**/*.ts'],
                dest: 'tmp/js',
                options: {
                    module: 'amd',
                    target: 'es5',
                    base_path: 'app/js',
                    sourcemap: false,
                    noImplicitAny: true
                }
            }
        },
        less: {
            base: {
                options: {
                    paths: ["app/css"]
                },
                files: {
                    "app/css/app.css": "app/css/app.less"
                }
            }
        },
        clean: {
            dist: {
                src: ['dist', 'tmp']
            }
        },
        copy: {
            dist: {
                files: [
                  {
                      expand: true,
                      cwd: 'app/',
                      src: ['**', '!lib/**', '!**/*.less', '!**/*.js.map', '!**/*.ts'],
                      dest: 'dist/'
                  },
                {
                    expand: true,
                    cwd: 'tmp/',
                    src: ['js/*.js'],
                    dest: 'dist/'
                }

                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('dist', ['clean:dist', 'typescript:dist', 'copy:dist']);
    grunt.registerTask('default', ['typescript:base', 'less:base']);

};
