const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

const getProjects = id =>
  !id
    ? db('projects')
    : db('projects')
        .where({ id })
        .first();

const getActions = id =>
  !id
    ? db('actions')
    : db('actions')
        .where({ id })
        .first();

const getProjectById = async id => {
  const project = await db('projects')
    .where('id', id)
    .first();
  const actions = await db('actions').where('project_id', id);
  return { ...project, actions };
};

const createProject = project =>
  db('projects')
    .insert(project)
    .then(([id]) => getProjects(id));

const createAction = actions =>
  db('actions')
    .insert(actions)
    .then(([id]) => getActions(id));

module.exports = {
  getProjectById,
  getProjects,
  createAction,
  createProject,
  getActions
};
