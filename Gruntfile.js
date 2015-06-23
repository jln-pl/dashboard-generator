module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'Gruntfile.js',
                'handlers/**/*.js',
                'model/**/*.js',
                'public/javascript/src/**/*.js',
                'public/javascript/app.js',
                'routes/**/*.js',
                'spec/**/*.js',
                'app.js'
            ]
        },
        bower: {
            install: {
                options: {
                    targetDir: './public/javascripts/lib'
                }
            }
        },
        jasmine_node: {
            backend: {
                options: {
                    coverage: {
                        excludes: ['spec/**/*.js'],
                        reportDir: 'coverage',
                        report: ['lcov']
                    },
                    forceExit: true,
                    specFolders: ['spec'],
                    extensions: 'js',
                    specNameMatcher: 'spec',
                    captureExceptions: true
                },
                src: ['**/*.js']
            }
        },
        babel: {
            options: {
                sourceMap: false,
                blacklist: ["strict"]
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "./public/javascripts/",
                    "src": ["**/*.js"],
                    "dest": "tmp",
                    "ext": ".js"
                }]
            }
        },
        browserify: {
            dist: {
                src: 'tmp/src/app.js',
                dest: './public/javascripts/dist/app.js'
            }
        },
        clean: {
            build: ['./public/javascripts/dist', './public/javascripts/lib'],
            tmp: ['tmp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['clean', 'bower', 'jshint', 'jasmine_node', 'babel', 'browserify', 'clean:tmp']);
    grunt.registerTask('test', ['jshint', 'jasmine_node']);
};