module.exports = function(io){

    var sharedObject = {};

    io.sockets.on('connection', newConnection)

    function newConnection(socket){


        // send to client current version of shared object
        socket.emit('$soData', sharedObject);


        // if this client does some changes to the object
        // it will be broadcasted to all other clients
        socket.on('$soData', setData);

        function setData(data){

            sharedObject = data;
            io.sockets.emit('$soData', sharedObject);

        }

    }
    return io;
}
