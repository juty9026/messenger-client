import React, { createContext, useState } from "react";

interface AppContextProps {
  userId?: number;
  setUserId: (userId: number | undefined) => void;
}
const AppContext = createContext<AppContextProps>({
  userId: undefined,
  setUserId: () => {}
});

const AppContextProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<number | undefined>(undefined);

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppContextProvider };
