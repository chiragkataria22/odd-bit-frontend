import { useState } from "react";
import "./App.css";
import Chatbot from "./Chatbot/Chatbot";

function App() {
  const [clearChat, setClearChat] = useState(false);
  const onNewChatClick = () => {
    setClearChat(true);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-wrapper">
          <img src="/bit-whites.svg" width={30} height={30} />
          <h2 className="heading">Odd Bit</h2>
        </div>
        <img
          src="/new_chat.svg"
          title={"New Chat"}
          width={30}
          height={30}
          className="invert-image"
          onClick={onNewChatClick}
        />
      </div>
      <Chatbot clearChat={clearChat} setClearChat={setClearChat} />
    </div>
  );
}

export default App;
