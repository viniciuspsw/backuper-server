const backuper = require('s3-mongo-backup');
const dotenv = require('dotenv');
const simpleNodeLoggger = require('simple-node-logger');
const projectModel = require('../models/project');
const backupModel = require('../models/backup');
const loggerConfig = require('../config/logger');

const logger = simpleNodeLoggger.createRollingFileLogger(loggerConfig);

dotenv.config();

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

const doBackups = async () => {
  try {
    const config = getConfig();
    const projects = await projectModel.find();

    for (const project of projects) {
      try {
        logMessage(`Starting backup for "${project.name}"`);

        const backup = await backuper({
          ...config,
          mongodb: project.connectionUrl,
          folder: String(project.name).toLowerCase(),
        });

        await backupModel.create({
          project: project._id,
          status: 'success',
          name: backup.name,
          url: backup.url,
        });

        logMessage(`Database backup for "${project.name}" finished!`);
      } catch (error) {
        await backupModel.create({
          project: project._id,
          status: 'error',
          errorDetails: String(error),
        });

        logMessage(`Couldn't backup database for "${project.name}": ${error}.`, 'error');
      }
    }
  } catch (error) {
    logMessage(`An error ocurred while trying to backup database: ${error}`, 'error');
  }
};

module.exports = {
  doBackups,
};
