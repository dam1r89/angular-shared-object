var io = require('socket.io').listen(8010);
console.log('Socket.io started on port 8010');
require('../shared-object')(io);
