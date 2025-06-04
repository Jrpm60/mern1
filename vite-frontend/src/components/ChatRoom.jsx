import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Conexión al servidor

const salas = ['Room1', 'Room2', 'Room3'];

function ChatRoom() {
  const [connected, setConnected] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('Room1');
  const [nick, setNick] = useState('');
  const [chats, setChats] = useState ([]);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket');
      setConnected(true);
      socket.emit('joinRoom', room);
    });

    socket.on('chatRoomMessage', (msg) => {
      console.log('Received message:', msg); // Para depurar
      setMessages(prev => [...prev, msg]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket');
      setConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chatRoomMessage');
    };
  }, []);

  const handleDisconnect = () => {
    socket.disconnect();
    setConnected(false);
  };

  const sendChatRoom = () => {
    if (!input || !nick) return;

    const msg = { room: room, message: input, nick: nick };
    socket.emit('chatRoomMessage', msg);
    setMessages(prev => [...prev, msg]); // Mostrar también el propio mensaje
    setInput('');
  };

  const histChat = () => {
    
  };




  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>💬 Chat Socket</h2>

      <input
        type="text"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        placeholder="Introduce tu NickName"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <label htmlFor="room">Salas disponibles</label>
      <select
        id="room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      >
        {salas.map((sala, index) => (
          <option key={index} value={sala}>
            {sala}
          </option>
        ))}
      </select>

      <p>Status: {connected ? '✅ Connected' : '❌ Disconnected'}</p>

      <div style={{ maxHeight: 300, overflowY: 'auto', marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, index) => {
          if (!msg || !msg.message || !msg.nick) return null;

          const isOwnMessage = msg.nick === nick;

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  backgroundColor: isOwnMessage ? '#dcf8c6' : '#e6e6e6',
                  borderRadius: 15,
                  padding: 10,
                  maxWidth: '70%',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                <strong>{msg.nick}</strong>
                <div>{msg.message}</div>
              </div>
            </div>
          );
        })}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe un mensaje"
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <button onClick={sendChatRoom} style={{ width: '100%', padding: 10, marginBottom: 10 }}>
        Enviar
      </button>

        <button onClick={histChat} style={{ width: '40%', padding: 10, marginLeft: 10 }}>
        Historico de Chats
      </button>

      {connected && (
        <button onClick={handleDisconnect} style={{ marginTop: 10, width: '40%', padding: 10, marginLeft: 10 }}>
          Desconectar
        </button>
      )}
    </div>
  );
}

export default ChatRoom;


