import ft from "./fixTime";
import { appendFile } from "fs/promises";

const logger = (logLine: string, isSystem?: boolean) => {
  logLine = logLine.split("\n").join(" ");

  const padd1 = "---------------[",
    padd2 = "]----------------",
    sendDate = new Date(),
    timestamp = `${ft(sendDate.getDate())}.${ft(sendDate.getMonth() + 1)}.${ft(
      sendDate.getFullYear()
    )} @ ${ft(sendDate.getHours())}:${ft(sendDate.getMinutes())}:${ft(
      sendDate.getSeconds()
    )}`,
    stringified = `[${timestamp}] ${isSystem ? padd1 : ""} ${logLine} ${
      isSystem ? padd2 : ""
    }`;

  console.log(stringified);
  appendFile("./logs/chat.txt", stringified + "\n");
};

export default logger;
