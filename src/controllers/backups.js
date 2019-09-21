const backupModel = require('../models/backup');

const list = async (req, res) => {
  try {
    const backups = await backupModel
      .find({ project: req.params.project })
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ backups });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

module.exports = {
  list,
};
