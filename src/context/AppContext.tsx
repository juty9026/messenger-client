import React, { createContext, useState } from "react";

const AppContext = createContext(null);

const AppContextProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<number>(undefined);

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppContextProvider };
