const express = require('express');
const moment = require('moment');

const {
  Task,
} = require('../../../models');

const chartsRouter = express.Router();

chartsRouter.get('/:serverId', async (req, res) => {
  try {
    const serverId = req.params.serverId;
    const end = moment();
    const start = moment().subtract(30, 'days');
    const labels = [];
    const complete = [];
    const notComplete = [];
    for (; start <= end; start.add(1, 'days')) {
      const date = {
        $gte: start.format('YYYY-MM-DD 00:00:00'),
        $lte: start.format('YYYY-MM-DD 23:59:59'),
      };
      labels.push(start.format('DD.MM'));
      complete.push(await Task.countDocuments({
        serverId,
        date,
        isComplete: true,
      }));
      notComplete.push(await Task.countDocuments({
        serverId,
        date,
        isComplete: false,
      }));
    }
    res.json({
      tasks: {
        labels,
        complete,
        notComplete,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      tasks: {
        labels: [],
        complete: [],
        notComplete: [],
      },
    });
  }
});
module.exports = {
  chartsRouter,
};
