const path = require('path');

module.exports = {
  fileNamePattern: 'backuper-<DATE>.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  logDirectory: path.join(__dirname, '..', '..', 'logs')
};
