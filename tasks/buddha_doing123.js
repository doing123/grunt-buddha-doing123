/*
 * grunt-buddha-doing123
 * 
 *
 * Copyright (c) 2017 doing123
 * Licensed under the MIT license.
 */

'use strict';

//引入path模块，读取路径中的内容
var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('buddha_doing123', 'Buddha\'s grace illuminates code as sunshine', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      who: 'buddha',
      commentSymbol: '//'
    });
    var who = options.who,
        commentSymbol = options.commentSymbol;

    var commentFilePathMap = {
      'buddha': 'assets/buddha.txt',
      'alpaca': 'assets/alpaca/txt'
    };

    var commentFilePath = path.join(__dirname, commentFilepathMap[who]),//__dirname:表示当前代码所在的目录
        commentContent = grunt.file.read(commentFilePath);

    var lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArr.forEach(function(value, index, arr){
        arr[index] = commentSymbol + value;
    });

    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));

    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
      // Concat specified files.
      var src = file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(file.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
