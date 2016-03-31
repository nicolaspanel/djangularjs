'use strict';
var assets = require('./assets');

module.exports = function(grunt) {
    // Project Configuration
    require('jit-grunt')(grunt, {
        'django-manage': 'grunt-contrib-django',
        'django-admin': 'grunt-contrib-django',
        'ngtemplates': 'grunt-angular-templates',
        'translate': 'grunt-djangularjs-translate'
    });
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            server: {
                files: ['assets.json'],  // changes to assets.json require to restart server
                tasks: ['django-manage:run-dev'],
                options: {
                    spawn: false,
                    interrupt: true,
                    livereload: true,
                    event: ['changed'],
                    atBegin: true
                }
            },
            views: {
                files: assets.html,
                options: { livereload: false }
            },
            js: {
                files: assets.js,
                tasks: ['jshint'],
                options: { livereload: false }
            },
            scss: {
                files: assets.scss,
                tasks: ['sass'],
                options: { livereload: true }
            }
        },
        jshint: {
            all: {
                src: [
                    '*.js',
                    'public/*.js',
                    'public/*[!_]*/**/*.js'
                ],
                options: { jshintrc: true }
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            all: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/app.css': 'public/config.scss'
                }
            }
        },
        translate: {
            all: {
                src: [
                    'public/*[!_]*/*.js',
                    'public/*[!_]*/*[!tests]*/*.js',
                    'public/*[!_]*/*[!tests]*/*.html'
                ],
                lang: ['en'],
                dest: 'i18n'
            }
        },
        ngtemplates:  {
            app:        {
                cwd: 'public',
                src: assets.html.map(function(file){return file.replace(new RegExp('^public/'), '');}),
                dest: 'dist/templates.js',
                options: {
                    prefix: assets.staticUrl
                }
            }
        },
        ngAnnotate: {
            app: {
                files: {
                    'dist/app.js': assets.js
                }
            }
        },
        uglify: {
            lib: {
                options: {
                    compress: false
                },
                files: {
                    'dist/lib.js': assets.lib.js
                }
            },
            app: {
                files: {
                    'dist/app.min.js': 'dist/app.js',
                    'dist/app-with-templates.min.js' :['dist/app.js', '<%= ngtemplates.app.dest %>']
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
              src: assets.css
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/full.min.css': assets.lib.css.concat(assets.css)
                }
            }
        },
        //concurrent: {
        //    default: ['django-manage:run', 'watch:server'],
        //    options: {
        //        logConcurrentOutput: true,
        //        limit: 5
        //    }
        //},
        karma: {
            options: {
                frameworks: ['jasmine-jquery', 'jasmine'],
                reporters: ['progress'],
                port: 9876,
                colors: true,
                logLevel: 'WARN',
                autoWatch: true,
                browsers: ['PhantomJS'],
                captureTimeout: 60000,
                singleRun: true,
                plugins: [
                    'karma-phantomjs-launcher',
                    'karma-jasmine',
                    'karma-jasmine-jquery',
                    'karma-ng-html2js-preprocessor'
                ],
                preprocessors: {
                    'public/*[!_]*/*[!tests]*/*.html': ['ng-html2js']
                },
                ngHtml2JsPreprocessor: {
                    stripPrefix: 'public/',
                    prependPrefix: assets.staticUrl,
                    moduleName: 'app'
                }
            },
            unit: {
                options: {
                    files:  assets.lib.js
                        .concat(assets.js)
                        .concat(assets.tests)
                        .concat(['public/*[!_]*/*[!tests]*/*.html'])
                }
            },
            min: {
                options: {
                    files: ['dist/lib.js', 'dist/app-with-templates.min.js'].concat(assets.tests)
                }
            }
        },
        'django-manage':{
            options: {
                app: 'server',
                verbose: true
            },
            'run-dev': {
                options: {
                    command: 'runserver',
                    args: ['0.0.0.0:3000']
                }
            },
            'run-prod': {
                options: {
                    command: 'runserver',
                    args: ['0.0.0.0:3000',  '--settings=server.settings.prod', '--insecure']
                }
            },
            test: {
                options: {
                    command: 'test',
                    args: ['--settings=server.settings.tests']
                }
            },
            compress: {
                options: {
                    command: 'compress',
                    args: ['--settings=server.settings.prod']
                }
            },
            dump: {
                options: {
                    command: 'dumpdata',
                    args: [
                        '--format=json',
                        '--indent=4',
                        //'server',                       // return only on application's models
                        '> server/fixtures/dump.json' // save in file
                    ]
                }
            },
            collect: {
                options: {
                    command: 'collectstatic',
                    args: ['--noinput']
                }
            }
        }
    });

    // Build task(s).
    grunt.registerTask('buildjs', ['jshint:all', 'ngAnnotate:app', 'ngtemplates:app', 'uglify', 'karma:min']);
    grunt.registerTask('buildcss', ['sass:all', 'postcss:dist', 'cssmin:dist']);
    grunt.registerTask('build', ['buildjs', 'buildcss', 'django-manage:collect', 'django-manage:compress']);

    // Test task(s).
    grunt.registerTask('test', ['django-manage:test', 'jshint', 'karma:unit']);

    grunt.registerTask('makemessages', [
        //'django-manage:makemessages',
        'translate:all'
    ]);
    grunt.registerTask('serve', ['django-manage:run-dev']);
    grunt.registerTask('serve-production-insecure', ['build', 'django-manage:run-prod']);
    grunt.registerTask('default', ['serve']);
};
