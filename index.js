const express = require('express');
const server = express();
const projectrouter = require('./projects/projects.router');

server.use(express.json());
server.use('/api/projects', projectrouter);

server.listen(4000, () => {
  console.log('Server running at port 4000');
});
