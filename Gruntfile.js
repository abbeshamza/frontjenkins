module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    ngdocs: {
      options: {
        scripts: ['angular.js', '../app.js'],
        html5Mode: false
      },
      all: ['app/**/*.js']
    },
    connect: {
      options: {
        keepalive: true
      },
      server: {}
    },
    clean: ['docs']
  });

  grunt.registerTask('default', ['clean', 'ngdocs', 'connect']);
  grunt.loadNpmTasks('grunt-contrib-watch');

};
