const cron = require('node-cron');
const backup = require('./backup');

const backups = () => {
  // every day at 1 am
  cron.schedule('0 1 * * *', () => {
    backup.doBackups();
  });
};

module.exports = {
  backups,
};
