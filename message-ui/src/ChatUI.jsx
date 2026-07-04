import { useState, useRef, useEffect } from "react";

const REPLIES = [
  "Sounds good!",
  "Okay 👍",
  "Tell me more",
  "Haha nice",
  "Got it!",
];

const ChatUI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, how are you?",
      sender: "other",
    },
    {
      id: 2,
      text: "I'm fine, thank you!",
      sender: "me",
    },
  ]);

  const [input, setInput] = useState("");
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current?.scrollTo({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) {
      return;
    }
    const myMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
    };
    const theirMessage = {
      id: Date.now() + 1,
      text: REPLIES[Math.floor(Math.random() * REPLIES.length)],
      sender: "other",
    };
    setMessages((prev) => [...prev, myMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, theirMessage]);
    }, 1000);
  };

  const handleChange = (val) => {
    if (val.trim()) {
      setInput(val);
    }
  };

  return (
    <div
      style={{
        width: "350px",
        height: "600px",
        backgroundColor: "teal",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
        ref={messageListRef}
      >
        {messages.map((message) => (
          <div
            style={{
              maxWidth: "50%",
              borderRadius: "10px",
              backgroundColor: message.sender === "me" ? "#007bff" : "#f0f0f0",
              padding: "6px",
              margin: "10px",
              alignSelf: message.sender === "me" ? "flex-end" : "flex-start",
            }}
            key={message.id}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <input
          style={{
            width: "80%",
            padding: "10px",
            outline: "none",
          }}
          type="text"
          value={input}
          placeholder="Enter your message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatUI;
