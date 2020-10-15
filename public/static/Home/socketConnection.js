
const getFormData = () => {
  return {
    'userName' : document.getElementById('user-name').value,
    'roomName' : document.getElementById('room-name').value
  }
};

const fillRooms = async () => {
  const roomUL = document.getElementById('join-rooms');
  roomUL.innerHTML = '';
  const rooms = await getRooms();
  if (rooms.length === 0) return;
  for (const roomName in rooms){
    const newLi = document.createElement('li');
    newLi.innerHTML = roomName;
    roomUL.append(newLi);
  }
};

const getRooms = async () => {
  const res = await fetch('http://localhost:3000/get-rooms');
  if (res.ok){
    const json = await res.json();
    return json;
  }else{
    console.error('Bad fetch to rooms.');
  }
};

const createRoom = async () => {
  const data = getFormData();
  const roomName = data['roomName'];
  const userName = data['userName'];
  await fetch(`http://localhost:3000/create-room?roomName=${roomName}&userName=${userName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

fillRooms();
const button = document.getElementById('create-btn');
button.addEventListener('click', () => {
  createRoom();
  fillRooms();
}, false);
