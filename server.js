var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

server.listen(8888);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

    app.use('/public', express.static(path.join(__dirname, 'public')))
});

io.sockets.on('connection', function(socket) {
    socket.on('send message', function(data) {
        io.sockets.emit('new message', data);
    	});
	});
});


io.on('connection', function(socket) {
            socket.emit('news', {
                hello: 'world'
            });
            socket.on('my other event', function(data) {
                console.log(data);
            });
            socket.on('news', function(msg) {
                console.log('message: ' + msg);
                io.emit('news', msg);
            });
            io.on('connection', function(socket) {
                socket.on('chat message', function(msg) {
                    io.emit('chat message', msg);
                });
            });