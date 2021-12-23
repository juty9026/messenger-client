import "./styles.scss";
import React from "react";
import ChatRoom from "./ChatRoom";

const App: React.FC = () => {
  return (
    <div className="App">
      <ChatRoom chatRoomId={1} />
    </div>
  );
};

export default App;
