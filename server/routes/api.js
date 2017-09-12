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

  router.post('/users', (req, res) => {
    dbHelper.createUser(req.body).then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/500");
    });
  });

  return router;
}