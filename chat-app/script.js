const socket = io();

// Get room and username from URL
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room');
const username = urlParams.get('user');

socket.emit('joinRoom', { username, room });

socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    div.innerText = msg;
    messages.appendChild(div);
});

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message').value;
    if (message) {
        socket.emit('chatMessage', { room, message, username });
        document.getElementById('message').value = ''; // Clear input
    }
});
