const express = require('express');
const moment = require('moment');
const { Group} = require('../../../models');

const groupsRouter = express.Router();

groupsRouter.post('/add-group', async (req, res) => {
    try {
      const group = new Group(req.query);
      await group.save()
    } catch (err) {
      console.log(err);
      res.json({});
    }
  });

groupsRouter.get('/groupslist', async (req, res) => {
    try {
      const groups = await Group.find();
      res.json(groups);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  });

  groupsRouter.put('/update-group', async (req, res) => {
    try {
      const _id = req.body.id;
      const name = req.body.name;
      const group = await Group.findByIdAndUpdate(_id, { name: name }, { new: true });
      res.json(group);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  });

  groupsRouter.delete('/del-group', async (req, res) => {
    try {
      const groupId = req.query.id;
      const group = await Group.findByIdAndDelete(groupId);
      res.json(group);
    } catch (err) {
      console.log(err);
      res.json({});
    }
  });

module.exports = {
    groupsRouter,
  };