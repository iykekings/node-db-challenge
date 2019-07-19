const { getProjects } = require('./projects.model');

const validateProjectId = async (req, res, next) => {
  try {
    const project = await getProjects(req.params.id);
    if (project) {
      next();
    }
    res
      .status(400)
      .json({ message: "The project_id for the action doesn't exist" });
  } catch (error) {
    res.status(500).json({ message: 'Could not validate the Id' });
  }
};

const validateProjectBody = (req, res, next) => {
  const { name, description } = req.body;
  if (name && description) {
    next();
  }
  res
    .status(400)
    .json({ message: 'Please provide name and description for the project' });
};

const validateActionBody = (req, res, next) => {
  const { notes, description } = req.body;
  if (notes && description) {
    next();
  }
  res
    .status(400)
    .json({ message: 'Please provide notes and description for the action' });
};

module.exports = {
  validateActionBody,
  validateProjectBody,
  validateProjectId
};
