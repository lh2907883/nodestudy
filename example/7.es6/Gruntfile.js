'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var config = {
    'app': 'src',
    'export': 'dist'
  };
  
  // Define the configuration for all the tasks
  grunt.initConfig({

    config: config,

    watch: {
      es6: {
        files: ['<%= config.app %>/**/*.es6'],
        tasks: ['babel']
      }
    },
    
    babel: {
      es6: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: ['**/*.es6'],
          dest: '<%= config.export %>',
          ext: '.js'
        }]
      }
    }
  });

  grunt.registerTask('build', [
    'babel'
  ]);

  /**
   * (默认任务)
   */
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);
};