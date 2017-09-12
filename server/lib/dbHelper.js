'use strict'

module.exports = (knex) => {
  return {
    getAllTasks: () => {
      return knex.raw(`SELECT tasks.id, tasks.list_id, tasks.name, tasks.completed, tasks.created_at, users.name AS user 
        FROM tasks, lists, users 
        WHERE tasks.list_id = lists.id AND lists.user_id = users.id
        ORDER BY tasks.created_at DESC`);
    },
    
    getUsers: () => {
      return knex('users')
      .select()
    },

    createUser: (data) => {
      console.log(data)
      return knex('users')
        .insert({
          name: data.name
        })
    }
    
  }
};