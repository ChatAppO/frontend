import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./messages.module.scss";
import { MessageInterface } from "../../../shared/interfaces/MessageInterface";
import { Message } from "../../atoms/Message/Message";
import { UserInterface } from "../../../shared/interfaces/UserInterface";
import { getLastMessages } from "../../../shared/functions/MessagesFunctions";
import { getUniqueId } from "../../../shared/functions/UniqueId";
import { UserContext } from "../../../contexts/UserContext";

interface Props {
  setSelectedUser: Dispatch<SetStateAction<string>>;
  lastGlobalMessage: string;
  messages: MessageInterface[];
  activeUsers: UserInterface[];
}

export const Messages = ({
  setSelectedUser,
  messages,
  activeUsers,
  lastGlobalMessage,
}: Props) => {
  const [lastMessages, setLastMessages] = useState<MessageInterface[]>([]);
  const { userName } = useContext(UserContext);

  useEffect(() => {
    const lastMsgs = getLastMessages(messages);
    setLastMessages(lastMsgs);
  }, [messages]);

  return (
    <div className={styles.messagesWrapper}>
      <p className={styles.messagesTitle}>Messages</p>
      <Message
        userName={"global"}
        msg={lastGlobalMessage}
        setSelectedUser={setSelectedUser}
        activeUsers={activeUsers}
      />
      <div className={styles.messagesContainer}>
        {lastMessages?.length !== 0 &&
          lastMessages?.map((msg) => {
            return (
              <Message
                key={getUniqueId(30)}
                userName={msg.to === userName ? msg.from : msg.to}
                msg={msg.value}
                setSelectedUser={setSelectedUser}
                activeUsers={activeUsers}
              />
            );
          })}
      </div>
    </div>
  );
};
