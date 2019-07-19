const router = require('express').Router();
const {
  getProjects,
  getProjectById,
  createAction,
  createProject
} = require('./projects.model');

router.get('/', async (req, res) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Could not retrieve the projects' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.params.id);
    if (project) {
      res.status(200).json(project);
    }
    res.status(404).json({ message: 'There is no project with that id' });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', validateProjectBody, async (req, res) => {
  try {
    const newProject = await createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Could not add the project' });
  }
});

router.post(
  '/projects/:id/actions',
  validateProjectId,
  validateActionBody,
  async (req, res) => {
    try {
      const newAction = await createAction({
        ...req.body,
        project_id: req.params.id
      });
      res.status(201).json(newAction);
    } catch (error) {
      res.status(500).json({ message: 'Could not add the action' });
    }
  }
);

// middlewares
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

module.exports = router;
