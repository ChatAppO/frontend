import React, { Dispatch, SetStateAction } from "react";
import styles from "./message-input.module.scss";

interface Props {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  handleClickButton: () => void;
  placeholder?: string;
}

export const MessageInput = ({
  text,
  setText,
  placeholder,
  handleClickButton,
}: Props) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleClickButton();
      setText("");
    }
  };

  return (
    <input
      className={styles.inputWrapper}
      value={text}
      placeholder={placeholder ? placeholder : "Type message"}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};
