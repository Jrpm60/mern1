import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Contador() {

    const [connected, setConnected] = useState(true);
    const [contar, setContar] = useState(0);
    const [messages, setMessages] = useState([]);

  
  useEffect(() => {
      socket.on('connection', () => {
        console.log('Connected to socket');
        setConnected(true);
      });
  
      socket.on('disconnect', (reason) => {
        console.log('Disconnected from socket');
        setConnected(false);
      });

      socket.on("respServ", (data) => {
        console.log(data);
        setMessages(prev => [...prev, data]);
    });
  
      return () => {
        socket.off('connection');
        socket.off('disconnect');
        socket.off('respServ');
  
      };
    }, []);


  const incrementar = () => { 
    setContar(prev => prev + 1); 
    socket.emit("onClick", contar);
  };
        

  
  const reiniciar = () => { setContar(0); setMessages([]) };

  return (
    <div>
      <h1>Contador: {contar}</h1> 

      <button onClick={incrementar}>Incrementar</button>
      
      <button onClick={reiniciar}>Reiniciar</button>

      {messages.map((message) => <div>{message}</div> )}

    </div>
  );
}

export default Contador;