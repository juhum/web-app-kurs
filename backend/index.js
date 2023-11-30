const express = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;
const { Server } = require('socket.io');

const serverInstance = httpServer.listen(3000,
  function () {
    console.log('Example app listening on port 3000!')
  })
const io = new Server(serverInstance)

require('dotenv').config()
const config = {
  url: process.env.URL,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
}

try {
  dialer.configure(config);
} catch (error) {
  console.error('Error configuring dialer:', error.message);
  process.exit(1);
}


let queue = [];

io.on('connection', (socket) => {
  queue.push(socket);

  socket.emit('queue', queue.indexOf(socket));

  socket.on('disconnect', () => {
    queue = queue.filter(s => s !== socket);
  });
});

httpServer.get('/call/:number1/:number2', (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  dialer.call(number1, number2);
  res.json({ success: true });
});

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


httpServer.post('/call/', async (req, res) => {
  const number1 = req.body.number;
  const number2 = process.env.NUMBER2;
  try {
    const isValid = await validateNumber(number1);
    if (!isValid) {
      console.error('Invalid number:', number1);
      io.emit('status', "FAILED");
      return;
    }
  } catch (error) {
    console.error('Error validating number:', error.message);
    io.emit('status', "FAILED");
    return;
  }
  if (isCallInProgress) {
    callQueue.push(number1);
    console.log("A call is already in progress. Next person has been added to the queue.");
    return;
  }

  console.log('Dzwonie', number1, number2)
  try {
    await makeCall(number1, number2);
  
    if (bridge) {
      res.json({ id: '123', status: bridge.STATUSES.NEW });
      console.log("your turn");
    } else {
      io.emit('status', "FAILED");
      isCallInProgress = false;
      return
    }
  } catch (error) {
    console.error('Error making call:', error.message);
    io.emit('status', "FAILED");
    isCallInProgress = false;
    return
  }
});

async function makeCall(number1, number2) {
  isCallInProgress = true;
  try {
    bridge = await dialer.call(number1, number2);
  } catch (error) {
    console.error('Error making call:', error);
    io.emit('status', "FAILED");
    clearInterval(interval);
    isCallInProgress = false;
    return;
  }

  let oldStatus = null
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
    if (currentStatus !== oldStatus) {
      oldStatus = currentStatus
      io.emit('status', currentStatus)
    }
    if (
      currentStatus === "ANSWERED" ||
      currentStatus === "FAILED" ||
      currentStatus === "BUSY" ||
      currentStatus === "NO ANSWER"
    ) {
      console.log('stop')
      clearInterval(interval)
      isCallInProgress = false;

      if (callQueue.length > 0) {
        const nextNumber = callQueue.shift();
        await makeCall(nextNumber, number2);
      }
    }
  }, 1000)
}

httpServer.get('/status', async function (req, res) {
  if (bridge) {
    let status = await bridge.getStatus();
    res.json({ id: '123', "status": status });
  }
})
