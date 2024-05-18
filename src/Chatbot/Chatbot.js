import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Chatbot.css";
import { NoMessageStyle } from "../EmptyChat/NoMessageStyle";
import { Loader } from "../Loader/Loader";

const Chatbot = (props) => {
  const { clearChat, setClearChat } = props || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (clearChat) {
      setMessages([]);
      setInput("");
      setClearChat(false);
    }
  }, [clearChat]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/getAiResponse", {
        userInput: input,
      });

      if (response.data && response.data.response) {
        const botMessage = response.data.response;
        setMessages([...newMessages, { sender: "bot", text: botMessage }]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window" ref={chatWindowRef}>
        {!messages?.length && <NoMessageStyle />}
        {messages.map((msg, index) => (
          <>
            {msg.text && (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <img
                    src="/bit-whites.svg"
                    className="bot-img"
                    width={30}
                    height={30}
                  />
                )}
                <pre className="text">{msg.text}</pre>
              </div>
            )}
          </>
        ))}
        {isLoading && (
          <div className="loader-wrapper">
            <img
              src="/bit-whites.svg"
              className="bot-img"
              width={30}
              height={30}
            />
            <Loader />
          </div>
        )}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Message Odd Bit"
          autoFocus
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
