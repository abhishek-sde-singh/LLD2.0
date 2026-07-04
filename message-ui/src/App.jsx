import ChatUI from "./ChatUI";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#e5ddd5",
      }}
    >
      <h3>Chat UI</h3>
      <ChatUI />
    </div>
  );
}

export default App;
