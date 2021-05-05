'use strict';

const loginForm = document.querySelector('#welcome-form'),
      messagesSection = document.querySelector('#messages-section'),
      messagesList = document.querySelector('#messages-list'),
      addMessageForm = document.querySelector('#add-messages-form'),
      userNameInput = document.querySelector('#username'),
      messageContentInput = document.querySelector('#message-content');

let userName;

loginForm.addEventListener('submit', event => login(event));
addMessageForm.addEventListener('submit', event => sendMessage(event));

const socket = io();
socket.on('message', ({author, content}) => addMessage(author, content));

function login(event) {
    event.preventDefault();
    if (userNameInput.value) {
        userName = userNameInput.value;
        socket.emit('join', userName);
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    } else {
        window.alert('Type your username first!');
    }
};

function sendMessage(event) {
    event.preventDefault();
    if (messageContentInput.value) {
      addMessage(userName, messageContentInput.value);
      socket.emit('message', {author: userName, content: messageContentInput.value});
      messageContentInput.value = '';
    } else {
      window.alert('Type your message first!');
    }
  };

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    if(author === 'Chat Bot') message.classList.add('message-bot');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
};