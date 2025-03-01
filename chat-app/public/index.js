const socket = io();

// Get room and username from URL
const urlParams = new URLSearchParams(window.location.search);
const room = urlParams.get('room');
const username = urlParams.get('user');

// Join room
socket.emit('joinRoom', { username, room });

socket.on('message', (data) => {
    const messages = document.getElementById('messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    // Assign different styles based on sender
    if (data.username === username) {
        messageDiv.classList.add('sent');
    } else {
        messageDiv.classList.add('received');
    }

    // Format timestamp
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messageDiv.innerHTML = `
        <strong>${data.username}:</strong> ${data.message}
        <div class="timestamp">${time}</div>
    `;

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
});

// Sending message
document.getElementById('send').addEventListener('click', () => {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('chatMessage', { room, message, username });
        messageInput.value = ''; // Clear input field
    }
});
socket.on('message', (data) => {
    const msgContainer = document.getElementById("messages");

    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message-bubble");

    msgDiv.innerHTML = `
        <p><strong>${data.username}:</strong> ${data.message}</p>
        <span class="timestamp">${new Date(data.timestamp).toLocaleTimeString()}</span>
    `;

    msgContainer.appendChild(msgDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
});
