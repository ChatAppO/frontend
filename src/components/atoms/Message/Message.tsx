import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./message.module.scss";
import ChatHeadWithOnlineDot from "../../../svg/ChatHeadWithOnlineDot.svg";
import ChatHeadWithoutDot from "../../../svg/ChatHeadWithoutDot.svg";
import { UserInterface } from "../../../shared/interfaces/UserInterface";
import { isUserActive } from "../../../shared/functions/MessagesFunctions";

interface Props {
  userName: string;
  msg: string;
  setSelectedUser: Dispatch<SetStateAction<string>>;
  activeUsers: UserInterface[];
}

export const Message = ({
  userName,
  msg,
  setSelectedUser,
  activeUsers,
}: Props) => {
  const [activeUser, setActiveUser] = useState(false);

  useEffect(() => {
    if (isUserActive(userName, activeUsers) || userName === "global")
      setActiveUser(true);
    else setActiveUser(false);
  }, [activeUsers]);

  return (
    <div
      className={styles.messageWrapper}
      onClick={() => setSelectedUser(userName)}
    >
      <img src={activeUser ? ChatHeadWithOnlineDot : ChatHeadWithoutDot} />
      <div className={styles.nameWithMessageContainer}>
        <p className={styles.usernameText}>{userName}</p>
        <p className={styles.msgText}>
          {msg.length > 40 ? msg.substring(0, 40) + "..." : msg}
        </p>
      </div>
    </div>
  );
};
