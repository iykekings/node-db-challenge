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

module.exports = router;
