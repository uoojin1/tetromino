'use strict';

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Server = new _ws2.default.Server({ port: 3000 });

console.log('listening on port 3000');

var connections = new Map();
var connectionID = 0;

Server.on('connection', function (ws) {
  var uniqueID = connectionID++;
  connections.set(uniqueID, ws);
  console.log('new online user', connections.keys());

  // received messsage
  ws.on('message', function (data) {
    console.log('message received', data);
    if (data === 'getOnlineUsers') {
      console.log('befre?', connections.keys());
      var onlineUsers = JSON.stringify([].concat(_toConsumableArray(connections.keys())));
      console.log('online users', onlineUsers);
      ws.send('getOnlineUsers:' + onlineUsers);
    }

    // Server.clients.forEach((client) => {
    //   // don't send me this back
    //   // if (client !== ws && client.readyState === WebSocket.OPEN) {
    //   //   console.log('send data to client!', data)
    //   //   client.send(data);
    //   // }
    //   if (client.readyState === WebSocket.OPEN) {
    //     console.log('send data to client!', data)
    //     client.send(data);
    //   }
    // })
  });

  // closing connection
  ws.on('close', function () {
    connections.delete(uniqueID);
    console.log('closing connection', connections);
  });
});