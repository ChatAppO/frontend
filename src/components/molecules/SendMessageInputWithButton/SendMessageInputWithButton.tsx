import React, { Dispatch, SetStateAction } from "react";
import styles from "./send-message-input-with-button.module.scss";
import { MessageInput } from "../../atoms/MessageInput/MessageInput";
import { SendMessageButton } from "../../atoms/SendMessageButton/SendMessageButton";

interface Props {
  handleButtonClick: () => void;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export const SendMessageInputWithButton = ({
  handleButtonClick,
  message,
  setMessage,
}: Props) => {
  return (
    <div className={styles.inputWrapper}>
      <MessageInput
        text={message}
        setText={setMessage}
        handleClickButton={handleButtonClick}
      />
      <SendMessageButton
        buttonText={"Send"}
        handleClickButton={handleButtonClick}
        setMessage={setMessage}
      />
    </div>
  );
};
