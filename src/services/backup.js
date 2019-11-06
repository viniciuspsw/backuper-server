const backuper = require('s3-mongo-backup');
const dotenv = require('dotenv');
const simpleNodeLoggger = require('simple-node-logger');
const projectModel = require('../models/project');
const backupModel = require('../models/backup');
const loggerConfig = require('../config/logger');
const logger = simpleNodeLoggger.createRollingFileLogger(loggerConfig);

dotenv.config();

const doBackups = async () => {
  try {
    const config = getConfig();
    const projects = await projectModel.find();

    for (const i in projects) {
      try {
        const backup = await backuper({
          ...config,
          mongodb: projects[i].connectionUrl,
          folder: String(projects[i].name).toLowerCase()
        });

        await backupModel.create({
          project: projects[i]._id,
          status: 'success',
          name: backup.name,
          url: backup.url,
        });

        logMessage(`Database backup for "${projects[i].name}" finished!`);
      } catch (error) {
        await backupModel.create({
          project: projects[i]._id,
          status: 'error',
          errorDetails: String(error),
        });

        logMessage(`Couldn't backup database for "${projects[i].name}": ${error}.`, 'error');
      }
    }
  } catch (error) {
    logMessage(`An error ocurred while trying to backup database: ${error}`, 'error');
  }
};

const logMessage = (message, type = 'info') => {
  logger[type](message);
};

const getConfig = () => ({
  rootFolder: 'database-backups',
  driver: {
    name: 'dropbox',
    accessToken: process.env.DROPBOX_ACCESS_KEY,
  },
});

module.exports = {
  doBackups,
};
