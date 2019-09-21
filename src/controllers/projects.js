const projectModel = require('../models/project');

const list = async (req, res) => {
  try {
    const projects = await projectModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ projects });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const store = async (req, res) => {
  try {
    const project = await projectModel.create(req.body);

    return res.json({ project });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const update = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res.json({ project });
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

const destroy = async (req, res) => {
  try {
    await projectModel.findByIdAndDelete(req.params.id);

    return res.json({});
  } catch (error) {
    return res
      .status(500)
      .json({ error });
  }
};

module.exports = {
  list,
  store,
  update,
  destroy,
};
