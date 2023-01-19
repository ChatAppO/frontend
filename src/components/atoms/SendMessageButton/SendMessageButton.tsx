import React, { Dispatch, SetStateAction } from "react";
import styles from "./send-message-button.module.scss";

interface Props {
  buttonText: string;
  handleClickButton: () => void;
  setMessage: Dispatch<SetStateAction<string>>;
}

export const SendMessageButton = ({
  buttonText,
  handleClickButton,
  setMessage,
}: Props) => {
  const handleClick = () => {
    handleClickButton();
    setMessage("");
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {buttonText ? buttonText : "Send"}
    </button>
  );
};
