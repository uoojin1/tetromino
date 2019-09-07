'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Server = new _ws2.default.Server({ port: 3000 });

console.log('listening on port 3000');

// Session variables
var connections = new Map();
var connectionID = 0;
var rooms = new Map();
var roomID = 0;

var mapToJson = function mapToJson(map) {
  return JSON.stringify([].concat(_toConsumableArray(map)));
};
var jsonToMap = function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
};

var convertConnectionsToList = function convertConnectionsToList() {
  return [].concat(_toConsumableArray(connections.keys()));
};

var broadcast = function broadcast(type, message) {
  console.log('- broadcas', type, message);
  console.log("[stringified]", JSON.stringify(type + ':' + message));
  console.log('server.clients', type, message);
  // console.dir(Server.clients, {depth: 0})
  Server.clients.forEach(function (client) {
    client.send(JSON.stringify(type + ':' + message));
  });
};

var handleJoinRoom = function handleJoinRoom(userID, roomID) {
  if (!rooms || !rooms.has(roomID)) {
    console.log('joining is not a valid action');
  }
  var usersInThisRoom = rooms.get(roomID);
  usersInThisRoom.push(userID);
  rooms.set(roomID, usersInThisRoom);
};

var handleCreateRoom = function handleCreateRoom(userID) {
  rooms.set(roomID, [userID]);
  roomID++;
  console.log('rooms?', rooms);
  console.log('stringified roomz', mapToJson(rooms));
  broadcast('createdRoom', mapToJson(rooms));
};

Server.on('connection', function (ws) {
  var uniqueID = connectionID++;
  connections.set(uniqueID, ws);

  // broadcast new connectino to every client
  broadcast('new', JSON.stringify(convertConnectionsToList()));

  // received messsage
  ws.on('message', function (msg) {
    var _JSON$parse$split = JSON.parse(msg).split(':'),
        _JSON$parse$split2 = _slicedToArray(_JSON$parse$split, 2),
        req = _JSON$parse$split2[0],
        body = _JSON$parse$split2[1];

    console.log('got message', req, body);
    switch (req) {
      case 'getOnlineUsers':
        var list = convertConnectionsToList();
        var message = 'getOnlineUsers:' + JSON.stringify(list);
        ws.send(JSON.stringify(message));
        break;
      // CHAT
      case 'chat':
        broadcast('chat', JSON.stringify(body));
        break;
      // ROOMS
      case 'createRoom':
        handleCreateRoom(uniqueID);
        break;
      case 'joinRoom':
        var _roomID = JSON.stringify(body);
        console.log('JOIN room ID?', _roomID);
        handleJoinRoom(uniqueID, _roomID);
        break;
      case 'exitRoom':
        break;
      default:
        break;
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
    Server.clients.forEach(function (client) {
      return client.send(JSON.stringify('close:' + uniqueID));
    });
  });
});