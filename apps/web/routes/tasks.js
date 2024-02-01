const express = require('express');
const moment = require('moment');
const {Task, Server} = require('../../../models');
const tasksRouter = express.Router();
function findColumnFilter(columns, columnName) {
  const column = columns.find((column) => column.data === columnName);
  if (column) {
    return column.search.value;
  }
}
tasksRouter.get('/list/:serverId', async (req, res) => {
  const query = {
    serverId: req.params.serverId,
  };
  try {
    const rows = await Task.find(query, null, {
      sort: '-date',
      limit: parseInt(req.query.length || 10),
      skip: parseInt(req.query.start || 0),
    });
    const count = await Task.countDocuments(query);

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
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max-min));
}
tasksRouter.get('/add-random',async(req,res)=>{
    try{
        console.log('get tasks/add-random');
        const servers = await Server.find({});
        console.log('servers.length', servers.length);
        const amountOfTasks = getRandomInt(10, 100);
        console.log('amountOfTasks',amountOfTasks);
        for(let i=0; i<amountOfTasks; i++){
            const server = servers[getRandomInt(0, servers.length)];
            await Task.create({
                serverId: server._id,
                date: moment(
                    moment().format('YYYY-MM-DD 00:00:00'),
                    'YYYY-MM-DD HH:mm:ss'
                    ).add(getRandomInt(0,86400),'seconds').format('YYYY-MM-DD HH:mm:ss'),
                name: `Task ${getRandomInt(0,10)}:${getRandomInt(0,10)}`,
                completeDuration: getRandomInt(1,100),
                isComplete: Math.random() > 0.20,
            });
        }
        res.json({});
    }catch(err){
        console.log(err);
        res.status(500).send('');
    }
});



module.exports = {
  tasksRouter,
};
