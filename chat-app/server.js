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
    socket.emit('availableRooms', getAvailableRooms());

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
        io.emit('availableRooms', getAvailableRooms());
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
        let disconnectedUser = null;
        let userRoom = null;

        for (const room in rooms) {
            for (const user in rooms[room].users) {
                if (rooms[room].users[user].socketId === socket.id) {
                    disconnectedUser = user;
                    userRoom = room;
                    delete rooms[room].users[user];

                    if (Object.keys(rooms[room].users).length === 0) {
                        delete rooms[room]; // Remove empty room
                    }

                    break;
                }
            }
        }

        if (disconnectedUser && userRoom) {
            io.to(userRoom).emit('updateUsers', getUsersInRoom(userRoom));
            io.emit('availableRooms', getAvailableRooms());
            io.to(userRoom).emit('message', {
                username: 'System',
                message: `${disconnectedUser} has left the room.`,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });
});

// Helper function to get users in a room
function getUsersInRoom(room) {
    return rooms[room] ? Object.keys(rooms[room].users) : [];
}

// Helper function to get available rooms
function getAvailableRooms() {
    const formattedRooms = {};
    for (const room in rooms) {
        formattedRooms[room] = Object.keys(rooms[room].users).length; // Count users
    }
    return formattedRooms;
}

// Helper function to get username by socket ID
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

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
