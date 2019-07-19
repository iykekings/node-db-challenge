const router = require('express').Router();
const { getProjects, getProjectById } = require('./projects.model');

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

module.exports = router;
