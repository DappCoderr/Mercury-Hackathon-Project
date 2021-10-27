import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useCallback
} from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

/** Actions */
import { onPacksSoldUpdateList } from "../reduxReducers/packsReducer";

const SocketContext = createContext();

const SocketProvider = props => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_CONNECT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const onPackSold = useCallback(
    updatedPack => {
      dispatch(onPacksSoldUpdateList(updatedPack));
    },
    [dispatch]
  );

  useEffect(() => {
    if (socket) {
      socket.on("pack-sold", onPackSold);
    }
  }, [socket, onPackSold]);

  const buyPackSocket = updatedPack => {
    socket.emit("packSold", updatedPack);
  };
  const requestCarRacing = (userID, carID) => {
    socket.emit("carRaceRequest", { userID, carID });
  };

  return (
    <SocketContext.Provider value={{ buyPackSocket, requestCarRacing }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocket = () => {
  return useContext(SocketContext);
};
