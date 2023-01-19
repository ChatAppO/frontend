import React, { useEffect, useState } from "react";
import styles from "./chat-window.module.scss";
import { ChatMessage } from "../../atoms/ChatMessage/ChatMessage";
import { MessageInterface } from "../../../shared/interfaces/MessageInterface";
import { getUniqueId } from "../../../shared/functions/UniqueId";
import { UserInterface } from "../../../shared/interfaces/UserInterface";
import { isUserActive } from "../../../shared/functions/MessagesFunctions";
import ChatHeadWithOnlineDot from "../../../svg/ChatHeadWithOnlineDot.svg";
import ChatHeadWithoutDot from "../../../svg/ChatHeadWithoutDot.svg";

interface Props {
  messages: MessageInterface[];
  userName: string;
  selectedUser: string;
  activeUsers: UserInterface[];
}

export const ChatWindow = ({
  messages,
  userName,
  selectedUser,
  activeUsers,
}: Props) => {
  const getMessage = (
    type: string,
    value: string,
    from: string,
    to: string
  ) => {
    if (type === "message") {
      if (to !== "global") return value;
      else return from + ": " + value;
    } else if (type === "connection" && userName !== from)
      return from + " is active now";
    else if (type === "connection" && userName == from)
      return "You are active now and your name is " + userName;
    else return from + "is offline now";
  };

  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    if (isUserActive(selectedUser, activeUsers) || selectedUser === "global")
      setActiveUser(true);
    else setActiveUser(false);
  }, [activeUsers]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatNameWrapper}>
        <img src={activeUser ? ChatHeadWithOnlineDot : ChatHeadWithoutDot} />
        <p className={styles.chatNameText}>{selectedUser}</p>
      </div>
      <div className={styles.messageContainer}>
        {messages?.length !== 0 &&
          messages?.map((msg) => {
            if (msg.from === userName)
              return (
                <div className={styles.chatWindowRight}>
                  <ChatMessage
                    key={getUniqueId(30)}
                    text={getMessage(msg.type, msg.value, msg.from, msg.to)}
                    type={"send"}
                  />
                </div>
              );
            else
              return (
                <div className={styles.chatWindowLeft}>
                  <ChatMessage
                    key={getUniqueId(30)}
                    text={getMessage(msg.type, msg.value, msg.from, msg.to)}
                    type={"receive"}
                  />
                </div>
              );
          })}
      </div>
    </div>
  );
};
