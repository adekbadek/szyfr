module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'style.css': 'sass/style.sass'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015'],
        plugins: ['babel-plugin-transform-react-jsx'],
      },
      dist: {
        // all files from js/ are transpiled to js/transpiled, from there browserify will take the entry file (Game.js)
        files: [{
            expand: true,
            cwd: 'js/', // src is relative to this
            src: ['*.jsx'],
            dest: 'js/transpiled',
            ext: '.js'
        }]
      }
    },
    // Browserify resolves require's to which ES6' imports are transpiled
    browserify: {
      dist: {
        files: {
          'app.js': 'js/transpiled/Game.js'
        }
      }
    },
    uglify: {
      options: {
        sourceMap : true,
      },
      build: {
        src: 'app.js',
        dest: 'app.min.js'
      }
    },
    watch: {
      sass: {
        files: ['sass/*.sass'],
        tasks: ['sass'],
        options: {
          livereload: true,
        },
      },
      babel: {
        files: ['js/*.jsx'],
        tasks: ['babel', 'browserify', 'uglify'],
        options: {
          livereload: true,
        },
      },
      all: {
        files: ['index.html', 'js/*.jsx'],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

};
