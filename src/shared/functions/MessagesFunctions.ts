import { MessageInterface } from "../interfaces/MessageInterface";
import { UserInterface } from "../interfaces/UserInterface";

export const getLastMessages = (messages: MessageInterface[]) => {
  const lastMessages: MessageInterface[] = [];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (!containsMessage(messages[i], lastMessages)) {
      lastMessages.push(messages[i]);
    }
  }
  return lastMessages;
};

export const containsMessage = (
  msg: MessageInterface,
  messages: MessageInterface[]
) => {
  for (let i = 0; i < messages.length; i++) {
    if (
      messages[i].to === msg.to ||
      messages[i].to === msg.from ||
      messages[i].from === msg.from
    )
      return true;
  }
  return false;
};

export const isUserActive = (username: string, users: UserInterface[]) => {
  for (let i = 0; i < users.length; i++) {
    if (username === users[i].userName) return true;
  }
  return false;
};

export const getMessagesByUserName = (
  messages: MessageInterface[],
  username: string
) => {
  return messages.filter((msg) => {
    if (msg.to === username || msg.from === username) return 1;
    else return 0;
  });
};
