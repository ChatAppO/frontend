import React, { Dispatch, SetStateAction, useContext } from "react";
import styles from "./active-user.module.scss";
import ChatHeadWithOnlineDot from "../../../svg/ChatHeadWithOnlineDot.svg";
import { UserContext } from "../../../contexts/UserContext";

interface Props {
  username: string;
  setSelectedUser: Dispatch<SetStateAction<string>>;
}
export const ActiveUser = ({ username, setSelectedUser }: Props) => {
  const { userName } = useContext(UserContext);

  return (
    <div
      className={styles.activeUserWrapper}
      onClick={() => setSelectedUser(username)}
    >
      <img src={ChatHeadWithOnlineDot} />
      <p
        className={
          userName === username
            ? styles.activeCurrentUser
            : styles.activeUserName
        }
      >
        {username}
      </p>
    </div>
  );
};
