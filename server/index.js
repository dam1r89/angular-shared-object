var io = require('socket.io').listen(8010);

require('./shared-object')(io);
