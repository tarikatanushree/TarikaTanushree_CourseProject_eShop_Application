import { createContext, useState } from "react";

const ServicesCtx = createContext();

//Note: this is custom service hook, it is used for displaying alert messages to user
const useServices = () => {
  const [message, setMessage] = useState(null);
  const [level, setLevel] = useState(null);

  const broadcastMessage = (messageBroadcast, messageLevel) => {
    setMessage(messageBroadcast);
    setLevel(messageLevel);
  };

  return {
    ServicesCtx,
    ServicesProvider: ({ children }) => (
      <ServicesCtx.Provider value={{ message, level, broadcastMessage }}>
        {children}
      </ServicesCtx.Provider>
    ),
  };
};

export default useServices;
