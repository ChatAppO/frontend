import React, { Dispatch, SetStateAction } from "react";
import styles from "./active-users.module.scss";
import { UserInterface } from "../../../shared/interfaces/UserInterface";
import { ActiveUser } from "../../atoms/ActiveUser/ActiveUser";

interface Props {
  activeUsers: UserInterface[];
  setSelectedUser: Dispatch<SetStateAction<string>>;
}

export const ActiveUsers = ({ activeUsers, setSelectedUser }: Props) => {
  return (
    <div className={styles.activeUsersWrapper}>
      <p className={styles.activeUserName}>Active users</p>
      <div className={styles.activeUsersContainer}>
        {activeUsers?.length !== 0 &&
          activeUsers?.map((user) => {
            return (
              <ActiveUser
                key={user.socketId}
                username={user.userName}
                setSelectedUser={setSelectedUser}
              />
            );
          })}
      </div>
    </div>
  );
};
