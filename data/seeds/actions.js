exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('actions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('actions').insert([
        {
          id: 1,
          notes: 'Buy cement',
          description: 'For costructions',
          completed: false,
          project_id: 1
        },
        {
          id: 2,
          notes: 'Buy wood',
          description: 'For costructions and design',
          completed: false,
          project_id: 1
        },
        {
          id: 3,
          notes: 'Get artworks',
          description: 'For decoration',
          completed: false,
          project_id: 1
        },
        {
          id: 4,
          notes: 'Get visa',
          description: 'For travelling',
          completed: false,
          project_id: 2
        },
        {
          id: 5,
          notes: 'Renew Passport',
          description: 'To buy ticket',
          completed: false,
          project_id: 2
        },
        {
          id: 6,
          notes: 'Practise SQL query',
          description: 'Select, Inser and Joins',
          completed: false,
          project_id: 3
        }
      ]);
    });
};
