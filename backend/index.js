const express = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;
const { Server } = require('socket.io');
const db = require('./db');


const serverInstance = httpServer.listen(3000,
  function () {
    console.log('Example app listening on port 3000!')
  })
const io = new Server(serverInstance);

require('dotenv').config()
if (process.env.URL && process.env.LOGIN && process.env.PASSWORD && process.env.NUMBER2) {
  const config = {
    url: process.env.URL,
    login: process.env.LOGIN,
    password: process.env.PASSWORD,
  }
  number2 = process.env.NUMBER2;
  dialer.configure(config);
} else {
  console.log("Using Fake Api")
  number2 = "500300200"
}


const cors = require('cors');
const bodyParser = require('body-parser');
httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

let isCallInProgress = false;
let callQueue = [];

bridge = null;


httpServer.post('/call/', async (req, res) => {
  const number1 = req.body.number;
  if (isCallInProgress) {
    callQueue.push(number1);
    console.log("A call is already in progress. Next person has been added to the queue.");
    return;
  }

  try {
    await makeCall(number1, number2);
  
    if (bridge) {
      res.json({ id: '123', status: bridge.STATUSES.NEW });
    } else {
      currentStatus = "FAILED";
      isCallInProgress = false;
      return
    }
  } catch (error) {
    console.error('Error making call:', error.message);
    currentStatus = "FAILED";
    isCallInProgress = false;
    return
  }
});

async function makeCall(number1, number2) {
  isCallInProgress = true;
  try {
    console.log('Calling', number1, number2);
    bridge = await dialer.call(number1, number2);

    db.run('INSERT INTO calls (number1, number2, status, timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', [number1, number2, 'CALLING']);

  } catch (error) {
    console.error('Error making call:', error);
    currentStatus = 'FAILED';
    clearInterval(interval);
    isCallInProgress = false;
    return;
  }

  let oldStatus = null;
  let interval = setInterval(async () => {
    let currentStatus;
    try {
      currentStatus = await bridge.getStatus();
    } catch (error) {
      console.error('Error getting status:', error);
      clearInterval(interval);
      isCallInProgress = false;
      return;
    }

    db.run('UPDATE calls SET status = ? WHERE number1 = ?', [currentStatus, number1]);

    if (currentStatus !== oldStatus) {
      oldStatus = currentStatus;
      io.emit('status', currentStatus);
    }

    if (
      currentStatus === 'ANSWERED' ||
      currentStatus === 'FAILED' ||
      currentStatus === 'BUSY' ||
      currentStatus === 'NO ANSWER'
    ) {
      console.log('stop');
      clearInterval(interval);
      isCallInProgress = false;

      if (callQueue.length > 0) {
        const nextNumber = callQueue.shift();
        console.log('Next person');
        await makeCall(nextNumber, number2);
      }
    }
  }, 1000);
}
module.exports = httpServer;

httpServer.get('/status/:number1', async function (req, res) {
  const number1 = req.params.number1;

  db.get('SELECT * FROM calls WHERE number1 = ?', [number1], (error, row) => {
    if (error) {
      console.error('Error getting call status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Call not found' });
    } else {
      res.json({ id: row.id, status: row.status, timestamp: row.timestamp });
    }
  });
});

httpServer.get('/call-history', async function (req, res) {
  db.all('SELECT id, number1, number2, status, strftime(\'%Y-%m-%d %H:%M:%S\', timestamp) AS formatted_timestamp FROM calls', (error, rows) => {
    if (error) {
      console.error('Error getting call history:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows.map(row => ({
        id: row.id,
        number1: row.number1,
        number2: row.number2,
        status: row.status,
        timestamp: row.formatted_timestamp
      })));
    }
  });
});

httpServer.get('/today-calls', async function (req, res) {
  const todayDate = new Date().toISOString().split('T')[0]; 

  db.all('SELECT * FROM calls WHERE DATE(timestamp) = ? AND status = ?', [todayDate, 'ANSWERED'], (error, rows) => {
    if (error) {
      console.error('Error getting today\'s answered calls:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows.map(row => ({ id: row.id, status: row.status, timestamp: row.timestamp })));
    }
  });
});
