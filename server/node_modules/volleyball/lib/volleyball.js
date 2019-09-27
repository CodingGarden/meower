'use strict'; // eslint-disable-line semi

var http = require('http');

var debug = require('debug');

var chalk = require('chalk');

var filesize = require('filesize');

var makeId = require('./id');

var sp = ' ';
module.exports = Volleyball(); // eslint-disable-line new-cap

function Volleyball() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // items shared across multiple req-res cycles, for a given volleyball
  var log = getLogger(config.debug);

  function volleyball(req, res, next) {
    // items shared between the request and response of just one cycle
    var cycle = {
      log: log,
      id: makeId(),
      time: process.hrtime()
    };
    logReq(req, cycle);

    var handleUnexpectedClose = function handleUnexpectedClose() {
      return logClose(res, cycle);
    };

    res.on('finish', function () {
      logRes(res, cycle);
      res.removeListener('close', handleUnexpectedClose);
    });
    res.on('close', handleUnexpectedClose);
    next();
  } // factory method which does not expose any of the library internals


  volleyball.custom = function () {
    return Volleyball.apply(void 0, arguments);
  }; // eslint-disable-line new-cap


  return volleyball;
}

function getLogger(debugChoice) {
  if (!debugChoice) return defaultLogger;
  if (debugChoice === true) return debug('http');
  if (typeof debugChoice === 'string') return debug(debugChoice);
  if (typeof debugChoice === 'function') return debugChoice;
  throw Error('Invalid option for debug');
}

function defaultLogger(str) {
  process.stdout.write(str + '\n');
}

function logReq(req, cycle) {
  var bytes = +req.headers['content-length'];
  var type = req.headers['content-type'];
  var reqLine = `${cycle.id} ${chalk.dim('——>')} `;
  reqLine += `${chalk.bold.underline(req.method)} ${req.url} `;
  if (bytes) reqLine += chalk.blue(filesize(bytes)) + sp;
  if (type) reqLine += chalk.blue.dim(type);
  cycle.log(reqLine);
}

function logRes(res, cycle) {
  var status = res.statusCode;
  var meaning = http.STATUS_CODES[status];
  var bytes = +res.getHeader('content-length');
  var type = res.getHeader('content-type');
  var statusColor = colorForStatus(status);
  var resLine = `${cycle.id} ${chalk.dim('<——')} `;
  resLine += chalk[statusColor](`${status} ${meaning}`) + sp;
  if (bytes) resLine += chalk.blue(filesize(bytes)) + sp;
  if (type) resLine += chalk.blue.dim(type) + sp;
  resLine += chalk.dim(`(<—> ${msDiff(cycle.time)} ms)`);
  cycle.log(resLine);
}

function logClose(res, cycle) {
  var closeLine = `${cycle.id} ${chalk.dim('—X—')} `;
  closeLine += chalk.red('connection closed before res end/flush');
  cycle.log(closeLine);
}

function colorForStatus(status) {
  if (status >= 500) return 'red';
  if (status >= 400) return 'yellow';
  if (status >= 300) return 'cyan';
  if (status >= 200) return 'green';
  return 'reset';
}

function msDiff(time) {
  var diff = process.hrtime(time);
  var seconds = diff[0];
  var nanoseconds = diff[1];
  var ms = (seconds * 1e9 + nanoseconds) / 1e6;
  return ms.toFixed(1);
}