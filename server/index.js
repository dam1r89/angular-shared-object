var io = require('socket.io').listen(8010);

var sharedObject = {};

io.sockets.on('connection', newConnection)


function newConnection(socket){


    // sent to the client current version of
    // shared object
    socket.emit('data', sharedObject);


    // if this client do some changes to the object
    // it will be broadcasted to all other clients
    socket.on('data', setData);

    function setData(data){

        sharedObject = data;
        io.sockets.emit('data', sharedObject);

    }

}

