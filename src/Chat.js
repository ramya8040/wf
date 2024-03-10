import React, { useEffect, useState } from "react";
import "./App.css";
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    console.log("useEffect running");
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data])
      console.log(messageList);
      console.log(data)
    })
    
  },[socket])
  return (
    <div className="chat-window">
      <div className="chat-header"><p>Live Chat</p></div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return <div className="message">
            <div>
              <div className="message-content">
                <p>{messageContent.message}</p>
              </div>
              <div className="message-meta">
                <p>{messageContent.time}</p>
                <p>{messageContent.author}</p>
              </div>
            </div>
          </div>
        })}
      </div>
      <div className="chat-footer">
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            placeholder="Hey..."
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          <button type="submit">&#9658;</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
