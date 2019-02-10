const app = require('express')();
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const http = require('http').Server(app);
const io = require('socket.io')(http);
io.removeAllListeners();
// const socketioAuth = require('socketio-auth');

const PORT = process.env.PORT || 8000;
// const SECRET = process.env.SECRET;

const winners = [];

const BIG_REWARD = {
  reward: 'Jackpot!',
};
const MED_REWARD = {
  reward: 'Huge win! Congratz!',
};
const SMALL_REWARD = {
  reward: 'You won!',
};
const NO_REWARD = {
  reward: 'Better luck next time!',
};

// // Connect to the Database
// const mongoose = require('mongoose');
// const mongoOpts = { useMongoClient: true, };
// const mongoUrl = 'mongodb://localhost/buttongame';
// io.use((socket, next) => {
//   mongoose
//     .connect(mongoUrl, mongoOpts)
//     .then(() => next())
//     .catch(e => console.error(e.stack));
// });

// // Authentication
// const User = require('./models/User');
// const authenticate = async (client, data, callback) => {
//   const { username, password, register, } = data;
//   try {
//     if (register) {
//       const user = await User.create({ username, password, });
//       callback(null, !!user);
//     } else {
//       const user = await User.findOne({ username, });
//       callback(null, user && user.validPassword(password));
//     }
//   } catch (error) {
//     callback(error);
//   }
// };

// // Configure Authentication
// socketioAuth(io, { authenticate, postAuthenticate, timeout: 'none', });

redisClient.on('error', (err) => {
  console.log(err);
});

// Setup
redisClient.SETNX('counter', 0);
var clicksLeft = 0;
redisClient.GET('counter', (err, value) => {
  if (err) {
    console.error(err);
    return;
  }
  clicksLeft = 100 - value % 100;
});

// Triggered for each connecting client
io.on('connection', (socket) => {
  var address = socket.request.connection.remoteAddress;
  console.log(`client (${address}) connected`);
  socket.emit('winner_list', winners);

  // Server posts updates every 100ms
  const interval = setInterval(() => {
    socket.emit('clicksleft', { counter: clicksLeft, });
  }, 100);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log(`client (${address}) disconnected`);
  });

  // Handle increments from clients
  socket.on('increment', () => {
    redisClient.incr('counter', (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      clicksLeft = 100 - res % 100;
      const date = new Date().toLocaleString();
      const winner = { ip: address, ts: date, };

      switch (true) {
        case (res % 500 === 0):
          winners.push(winner);
          socket.emit('reward', BIG_REWARD);
          io.emit('list_reward', winner);
          break;
        case res % 200 === 0:
          winners.push(winner);
          socket.emit('reward', MED_REWARD);
          io.emit('list_reward', winner);
          break;
        case res % 100 === 0:
          winners.push(winner);
          socket.emit('reward', SMALL_REWARD);
          io.emit('list_reward', winner);
          break;
        default:
          // io.emit('list_reward', { ip: address, ts: date, });
          socket.emit('reward', NO_REWARD);
      }
    });
  });
});

app.get('/', (req, res) => {
  return res.send('This is an API, nothing here');
});

http.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
