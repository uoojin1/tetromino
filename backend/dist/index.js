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
  Server.clients.forEach(function (client) {
    client.send(JSON.stringify(type + ':' + message));
  });
};

var handleJoinRoom = function handleJoinRoom(userID, JSONroomID) {
  var roomID = Number(JSON.parse(JSONroomID));
  if (!rooms || !rooms.has(roomID)) {
    console.log('joining is not a valid action');
    return;
  }
  var usersInThisRoom = rooms.get(roomID);
  usersInThisRoom.add(userID);
  rooms.set(roomID, usersInThisRoom);
  // broadcast to the people in that room

  console.log('\nROOM ID: ', roomID);
  console.log('all rooms', rooms);
  console.log('-- users in this room --');
  usersInThisRoom.forEach(function (userID) {
    console.log('     ---- userID ----', userID);
    if (connections.has(userID)) {
      console.log('we found user', userID);
    }
  });
};

var handleCreateRoom = function handleCreateRoom(userID) {
  rooms.set(roomID, new Set([userID]));
  roomID++;
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

    switch (req) {
      case 'getOnlineUsers':
        var list = convertConnectionsToList();
        ws.send(JSON.stringify('gotOnlineUsers:' + JSON.stringify(list)));
        break;
      case 'getAvailableRooms':
        var availableRooms = mapToJson(rooms);
        ws.send(JSON.stringify('gotAvailableRooms:' + availableRooms));
        break;
      case 'chat':
        var formattedMessage = 'userID_[' + uniqueID + ']   -->   ' + body;
        broadcast('chatted', JSON.stringify(formattedMessage));
        break;
      case 'createRoom':
        handleCreateRoom(uniqueID);
        break;
      case 'joinRoom':
        console.log('JOIN ROOM received!');
        console.log({ req: req, body: body });
        var _roomID = JSON.stringify(body);
        handleJoinRoom(uniqueID, _roomID);
        break;
      case 'exitRoom':
        break;
      default:
        break;
    }
  });

  // closing connection
  ws.on('close', function () {
    connections.delete(uniqueID);
    Server.clients.forEach(function (client) {
      return client.send(JSON.stringify('close:' + uniqueID));
    });
  });
});