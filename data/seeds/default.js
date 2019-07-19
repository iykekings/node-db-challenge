exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1,
          name: 'Build a duplex',
          description: 'A place where the family can live',
          completed: false
        },
        {
          id: 2,
          name: 'Go for holiday',
          description: 'Get enough rest and sun bathe',
          completed: false
        },
        {
          id: 3,
          name: 'Assignments',
          description: 'Lambda School Sprint',
          completed: false
        },
        {
          id: 4,
          name: 'Take Test',
          description: 'Andela ALC test',
          completed: false
        },
        {
          id: 5,
          name: 'Interview',
          description: 'Lambda School Tl interview',
          completed: false
        }
      ]);
    });
};
