const socket = io();

document.getElementById('loginPage').style.display = 'block';
document.getElementById('chatPage').style.display = 'none';

function joinChat() {
    const username = document.getElementById('username').value.trim();
    const room = document.getElementById('room').value.trim();

    if (username && room) {
        socket.emit('joinRoom', { username, room });
    }
}

socket.on('updateRooms', (rooms) => {
    const roomList = document.getElementById('roomList');
    roomList.innerHTML = '';

    rooms.forEach(room => {
        const button = document.createElement('button');
        button.classList.add('room-button');
        button.textContent = room;
        button.onclick = () => {
            document.getElementById('room').value = room;
            joinChat();
        };
        roomList.appendChild(button);
    });
});

socket.on('updateUsers', (users) => {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});

socket.on('joinedRoom', (room) => {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('chatPage').style.display = 'flex';
    document.getElementById('roomTitle').textContent = `Chat Room: ${room}`;
    document.getElementById('messageInput').focus();
});

socket.on('duplicateUsername', (msg) => {
    alert(msg);
});

socket.on('message', (data) => {
    const messageBox = document.getElementById('messages');
    const msg = document.createElement('div');

    msg.classList.add('message');
    if (data.username === "System") {
        msg.classList.add('system');
    } else if (data.username === document.getElementById('username').value) {
        msg.classList.add('user-message');
    } else {
        msg.classList.add('other-message');
    }

    msg.innerHTML = `<strong>${data.username}</strong>: ${data.message} 
                       <span class="timestamp">${data.timestamp}</span>`;
    messageBox.appendChild(msg);
    messageBox.scrollTop = messageBox.scrollHeight;
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        socket.emit('chatMessage', { message });
        messageInput.value = '';
    }
}