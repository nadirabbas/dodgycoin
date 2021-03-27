require("dotenv").config();

import { raw, wrap } from "./dogehouse/index";
const { connect } = raw;
import botTheRoom from "./botTheRoom";
import { readFile } from "fs/promises";

const main = async () => {
  try {
    let configPath = "./configs/1.json";
    if (process.argv[2]) configPath = `./configs/${process.argv[2]}.json`;
    const {
      token,
      refreshToken,
    }: { token: string; refreshToken: string } = JSON.parse(
      await readFile(configPath, "utf-8")
    );
    const connection = await connect(token, refreshToken, {
      onConnectionTaken: () => {
        console.error("\nAnother client has taken the connection");
        process.exit();
      },
    });
    const wrapper = wrap(connection);

    const rooms = await wrapper.query.getTopPublicRooms();
    let theRoom = rooms.rooms[0];

    await botTheRoom(wrapper, theRoom);
  } catch (e) {
    if (e.code === 4001) console.error("invalid token!");
    console.error(e);
    process.exit();
  }
};

main();
