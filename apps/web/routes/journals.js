const express = require('express');
const moment = require('moment');
const {UserAction} = require('../../../models');
const journalsRouter = express.Router();
function findColumnFilter(columns, columnName) {
  const column = columns.find((column) => column.data === columnName);
  if (column) {
    return column.search.value;
  }
}
journalsRouter.get('/user-actions/:serverId', async (req, res) => {
  const query = {
    serverId: req.params.serverId,
  };
  try {
    const rows = await UserAction.find(query, null, {
      sort: '-date',
      limit: parseInt(req.query.length || 10),
      skip: parseInt(req.query.start || 0),
    });
    const count = await UserAction.countDocuments(query);

    res.json({
      draw: parseInt(req.query.draw),
      recordsTotal: count,
      recordsFiltered: count,
      data: rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('');
  }
});




module.exports = {
  journalsRouter,
};
