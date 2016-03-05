'use strict';
module.exports = function(grunt) {
  grunt.initConfig({
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [  
          require("postcss-import")(),
          require("postcss-url")(), 
          require('postcss-responsive-type')(),
          require('postcss-cssnext')({browsers: 'last 1 version, > 5%'}),
          
          require("postcss-nesting")(),
          require('postcss-responsive-type')(),
          require('lost')(),
          require('postcss-discard-comments')(),
          require('cssnano')(), // minify the result
          require("postcss-browser-reporter")()
        ]
      },
      dist: {
        src: 'css/style.css',
        dest: '../static/css/style.css'
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        title: "project name", // defaults to the name in package.json, or will use project directory's name
        success: true, // whether successful grunt executions should be notified automatically
        duration: 2 // the duration of notification in seconds, for `notify-send only
      }
    },
    watch: {
      grunt: { 
        files: ['Gruntfile.js'] 
      },
      html: {
        files: ['../layouts/*.html','../layouts/partials/*.html'],
        tasks: ['postcss']
      },
      css: {
        files: ['css/*.css','css/partials/*.css','../static/css/style.css'],
        tasks: ['postcss']
      },
      options: {
        livereload: true
      }
    },

  });
 
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.task.run('notify_hooks');
  grunt.registerTask("default", ['watch']);
 
};