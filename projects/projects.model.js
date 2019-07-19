const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

const getProjects = () => db('projects');

const getProjectById = async id => {
  const project = await db('projects')
    .where('id', id)
    .first();
  const actions = await db('actions').where('project_id', id);
  return { ...project, actions };
};

const createProject = project => db('projects').insert(project);

const createAction = actions => db('actions').insert(actions);

module.exports = {
  getProjectById,
  getProjects,
  createAction,
  createProject
};
