import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { ChatWindow } from "../molecules/ChatWindow/ChatWindow";
import { SendMessageInputWithButton } from "../molecules/SendMessageInputWithButton/SendMessageInputWithButton";
import { MessageInterface } from "../../shared/interfaces/MessageInterface";
import { UserInterface } from "../../shared/interfaces/UserInterface";
import { Messages } from "../molecules/Messages/Messages";
import { ActiveUsers } from "../molecules/ActiveUsers/ActiveUsers";
import styles from "./home.module.scss";
import { getMessagesByUserName } from "../../shared/functions/MessagesFunctions";

export const Home = () => {
  const { userName } = useContext(UserContext);
  const socket = useContext(WebsocketContext);
  const [socketId, setSocketId] = useState(socket.id);

  const [globalMessages, setGlobalMessages] = useState<MessageInterface[]>([]);
  const [privateMessages, setPrivateMessages] = useState<MessageInterface[]>(
    []
  );

  const [activeUsers, setActiveUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      setSocketId(socket.id);

      // when you connect send your username
      socket.emit("FirstConnection", { from: userName });
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("onActiveUsers", (users: UserInterface[]) => {
      setActiveUsers(users);
    });

    socket.on(userName, (msg) => {
      if (msg?.messages !== undefined) {
        setGlobalMessages(msg.messages);
      } else {
        setPrivateMessages((old) => [...old, msg]);
      }
    });

    socket.on("onReceivedGlobalMessage", (data: MessageInterface) => {
      const newMsg: MessageInterface = {
        type: data.type,
        value: data.value,
        fromId: data.fromId,
        from: data.from,
        to: data.to,
      };
      setGlobalMessages((old) => [...old, newMsg]);
    });

    // register events only once, on refresh disconnect
    return () => {
      console.log("Unregistering events...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("onActiveUsers");
      socket.off(userName);
      socket.off("onReceivedGlobalMessage");
    };
  }, []);

  const [selectedUser, setSelectedUser] = useState("global");
  const [message, setMessage] = useState("");

  const sendMessageToUser = () => {
    if (selectedUser !== "" && userName !== selectedUser) {
      const msg = {
        type: "message",
        value: message,
        fromId: socketId,
        from: userName,
        to: selectedUser,
      };
      if (selectedUser !== "global") {
        setPrivateMessages((old) => [...old, msg]);
      }
      socket.emit("newMessage", msg);
    }
  };
  const [lastGlobalMessage, setLastGlobalMessage] = useState("");
  const [selectedUserMessages, setSelectedUserMessages] = useState<
    MessageInterface[]
  >([]);

  useEffect(() => {
    if (globalMessages?.length !== 0) {
      const lastMsg = globalMessages[globalMessages.length - 1];
      if (lastMsg.type === "message") setLastGlobalMessage(lastMsg.value);
      else if (lastMsg.type === "connection")
        setLastGlobalMessage(lastMsg.from + " is active now");
      else setLastGlobalMessage(lastMsg.from + "is offline now");
    } else setLastGlobalMessage("");
  }, [globalMessages]);

  useEffect(() => {
    if (selectedUser === "global" || selectedUser === "")
      setSelectedUserMessages(globalMessages);
    else {
      const msgs = getMessagesByUserName(privateMessages, selectedUser);
      setSelectedUserMessages(msgs);
    }
  }, [selectedUser, globalMessages, privateMessages]);

  return (
    <div className={styles.homeWrapper}>
      <ActiveUsers
        activeUsers={activeUsers}
        setSelectedUser={setSelectedUser}
      />
      <div className={styles.elementsContainer}>
        <Messages
          setSelectedUser={setSelectedUser}
          messages={privateMessages}
          activeUsers={activeUsers}
          lastGlobalMessage={lastGlobalMessage}
        />
        <div className={styles.chatWithInput}>
          <ChatWindow
            messages={selectedUserMessages}
            userName={userName}
            selectedUser={selectedUser}
            activeUsers={activeUsers}
          />
          <SendMessageInputWithButton
            handleButtonClick={sendMessageToUser}
            message={message}
            setMessage={setMessage}
          />
        </div>
      </div>
    </div>
  );
};
