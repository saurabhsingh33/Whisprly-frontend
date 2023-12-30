"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error(`state is undefined`);
  }
  return state;
};

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const sendMessage = useCallback(
    (message) => {
      console.log("Send Message: ", message);
      if (socket) {
        socket.emit("event:message", { message: message });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((msg) => {
    console.log("From server message recieved: ", msg);
    const { message } = JSON.parse(msg);
    setMessages((prev) => [...prev, message]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);
    setSocket(_socket);
    return () => {
      _socket.off("message", onMessageRec);
      _socket.disconnect();
      setSocket(undefined);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {props.children}
    </SocketContext.Provider>
  );
};
