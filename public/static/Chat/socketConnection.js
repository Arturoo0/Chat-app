
const getURLRoomName = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get('roomName')
}

const setRoomName = () => {
  const header = document.getElementById('room-name');
  header.textContent = getURLRoomName();
}

const socket = io();
setRoomName();
socket.emit('join', getURLRoomName());

const addMsg = (msg, elementClass, spanClass) => {
  const msgList = document.getElementById('messages');
  const newLi = document.createElement('li');
  newLi.classList.add(elementClass);
  newLi.innerHTML = `<div class=${spanClass}>${msg}</div>`;
  msgList.append(newLi);
}

const removeMsg = () => {
  const msgList = document.getElementById('messages');
  msgList.removeChild(msgList.lastChild);
}

const button = document.getElementById('btn');
button.addEventListener('click', () => {
  event.preventDefault();
  const form = document.getElementById('m').value;
  addMsg(form, 'right-msg', 'right-msg-div');
  socket.emit('chat message', form, getURLRoomName());
}, false);

socket.on('chat message', (msg) => {
  addMsg(msg, 'left-msg', 'left-msg-div');
});
