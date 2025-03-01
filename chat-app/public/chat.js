const socket = io();

// Get room and username from URL
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room');
const username = urlParams.get('user');

// Join the room
socket.emit('joinRoom', { username, room });

// Listen for messages
socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    div.innerText = msg;
    messages.appendChild(div);
});

// Send a message
document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    if (message) {
        socket.emit('chatMessage', { room, message, username });
        document.getElementById('message').value = ''; // Clear input
    }
});

// Display available rooms in chat room
socket.on('updateRooms', (rooms) => {
    const roomList = document.getElementById('chat-room-list');
    roomList.innerHTML = '';

    rooms.forEach(r => {
        const div = document.createElement('div');
        div.innerText = r;
        roomList.appendChild(div);
    });
});

// Display active users in the chat room
socket.on('updateUsers', (users) => {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const div = document.createElement('div');
        div.innerText = user;
        userList.appendChild(div);
    });
});
socket.on('duplicateUsername', (msg) => {
    alert(msg);
    window.location.href = '/'; // Redirect back to the homepage
});
