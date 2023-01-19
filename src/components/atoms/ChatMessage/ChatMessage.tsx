import React from "react";
import styles from "./chat-message.module.scss";

interface Props {
  text: string;
  type: string;
}

export const ChatMessage = ({ text, type }: Props) => {
  return (
    <div
      className={
        type === "send"
          ? styles.sendMessageWrapper
          : styles.receiveMessageWrapper
      }
    >
      <p className={type === "send" ? styles.sendText : styles.receiveText}>
        {text}
      </p>
    </div>
  );
};
