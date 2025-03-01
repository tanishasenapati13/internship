const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const rooms = {}; // Object to hold room data

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);

    // Emit available rooms to the client
    socket.emit('availableRooms', Object.keys(rooms));

    socket.on('joinRoom', ({ username, room }) => {
        // Check if username is unique within the room
        if (rooms[room] && rooms[room].users[username]) {
            socket.emit('usernameTaken', 'Username is already taken in this room!');
            return;
        }

        if (!rooms[room]) {
            rooms[room] = { users: {} };
        }

        rooms[room].users[username] = { socketId: socket.id };
        socket.join(room);

        // Notify others in the room
        socket.broadcast.to(room).emit('message', {
            username: 'System',
            message: `${username} has joined the room.`,
            timestamp: new Date().toLocaleTimeString()
        });

        // Update all clients with the available rooms
        io.emit('availableRooms', Object.keys(rooms));
        io.to(room).emit('updateUsers', getUsersInRoom(room));
        socket.emit('joinedRoom', room);
    });

    socket.on('chatMessage', ({ message, room }) => {
        const username = getUsernameBySocketId(socket.id);
        if (username) {
            const timestamp = new Date().toLocaleTimeString();
            io.to(room).emit('message', { username, message, timestamp, senderId: socket.id });
        }
    });

    socket.on('disconnect', () => {
        let username;
        for (const room in rooms) {
            for (const user in rooms[room].users) {
                if (rooms[room].users[user].socketId === socket.id) {
                    username = user;
                    delete rooms[room].users[user];
                    if (Object.keys(rooms[room].users).length === 0) {
                        delete rooms[room];
                    } else {
                        io.to(room).emit('updateUsers', getUsersInRoom(room));
                    }
                    break;
                }
            }
        }
        if (username) {
            io.emit('availableRooms', Object.keys(rooms));
            io.emit('message', {
                username: 'System',
                message: `${username} has left the room.`,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    function getUsersInRoom(room) {
        if (!rooms[room]) return [];
        return Object.keys(rooms[room].users);
    }

    function getUsernameBySocketId(socketId) {
        for (const room in rooms) {
            for (const user in rooms[room].users) {
                if (rooms[room].users[user].socketId === socketId) {
                    return user;
                }
            }
        }
        return null;
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
