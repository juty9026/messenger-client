import "./styles.scss";
import React, { useContext, useEffect } from "react";
import AppContext from "./context/AppContext";
import ChatRoom from "./ChatRoom";

const App: React.FC = () => {
  const { setUserId } = useContext(AppContext);

  useEffect(() => {
    setUserId(1);
  }, [setUserId]);

  return (
    <div className="App">
      <ChatRoom chatRoomId={1} />
    </div>
  );
};

export default App;
