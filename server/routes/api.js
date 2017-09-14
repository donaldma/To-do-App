"use strict";

const express = require('express');
const router = express.Router();

module.exports = (dbHelper) => {
  router.get('/all', (req, res) => {
    dbHelper.getAllTasks().then((results) => {
      res.json(results);
    })
  });

  router.get('/users', (req, res) => {
    dbHelper.getUsers().then((results) => {
      res.json(results);
    })
  });

  router.get('/users/search/:name', (req, res) => {
    console.log(req.params.name)
    dbHelper.searchUser(req.params.name).then((results) => {
      res.json(results);
    })
  });

  router.get('/tasks', (req, res) => {
    dbHelper.getUsersTasks(req.query.user_id).then((results) => {
      res.json(results);
    })
  });

  router.post('/users', (req, res) => {
    dbHelper.createUser(req.body).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });

  router.post('/users/edit/:id', (req, res) => {
    dbHelper.updateUser(req.body, req.params.id).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });

  router.post('/tasks/:id', (req, res) => {
    dbHelper.createTask(req.body, req.params.id).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });
  
  router.post('/updateTrue', (req, res) => {
    dbHelper.toggleTrue(req.query.task_id).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });

  router.post('/updateFalse', (req, res) => {
    dbHelper.toggleFalse(req.query.task_id).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });

  router.delete('/users/:id', (req, res) => {
    dbHelper.deleteUser(req.params.id).then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  })

  router.delete('/tasks/:id', (req, res) => {
    dbHelper.deleteTask(req.params.id).then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  })

  return router;
}