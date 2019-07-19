const router = require('express').Router();
const {
  getProjects,
  getProjectById,
  createAction,
  createProject
} = require('./projects.model');

const {
  validateActionBody,
  validateProjectBody,
  validateProjectId
} = require('./projects.middleware');

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
  '/:id/actions',
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

module.exports = router;
