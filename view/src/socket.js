import io from 'socket.io-client';

const socket = io(`${window.location.host}:3000`);

export default socket;
