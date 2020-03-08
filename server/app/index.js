const Koa = require('koa');


const app = new Koa();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const socket = require('./socket');

socket(io);


http.listen(3000, () => {
  console.log('listening on *:3000');
});
