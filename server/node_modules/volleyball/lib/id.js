'use strict'; // eslint-disable-line semi

var chalk = require('chalk');

var nextColor = function () {
  var colors = ['red', 'green', 'yellow', 'cyan', 'magenta'];
  var i = 0;
  return function () {
    return colors[i++ % colors.length];
  };
}();

var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var LEN = 4;

module.exports = function makeId() {
  var color = nextColor();
  var id = '',
      i = LEN;

  while (i--) {
    id += CHARS.substr(Math.random() * CHARS.length, 1);
  }

  return chalk.dim[color](id);
};