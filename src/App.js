import React, { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";
const socket = io("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <form onSubmit={(e) => joinRoom(e)} className="joinChatContainer">
          <h1>Join a room</h1>
          <input
            type="text"
            placeholder="Name.."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Id"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join a room</button>
        </form>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
