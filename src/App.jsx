import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const socket = io.connect("http://localhost:5000/");

  const [message, setMessage] = useState('');
  const [getMessage, setGetMessage] = useState('');
  const [room, setRoom] = useState('');

  const handleSend = () => {
    socket.emit("reactEvent", {message,room});
  };
  
  const handleRoom = () => {
    socket.emit("joinRoom", room);
  };


  useEffect(() => {
   socket.on('showMessage',(data)=>{
    console.log(data);
    setGetMessage(data.message);
   });
  }, [socket]);
  

  return (
    <div className="App">
      <h1>hello from Socket io</h1>

      <div className="container ">
        <h3 className="h1" >Sender: {message}</h3>
        
        <h3>Reciver: {getMessage}</h3>
      </div>

      <input
        onBlur={(e) => setRoom(e.target.value)}
        type="text"
        placeholder="Room...."
      />
      <button onClick={handleRoom}>join room</button>
      <input
        onBlur={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="message...."
      />
      <button onClick={handleSend}>send</button>
    </div>
  );
}

export default App;
