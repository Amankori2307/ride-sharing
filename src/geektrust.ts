import fs from "fs";
import { RideSharingApp } from "./classes/ride-sharing-app.class";
import { CommandsEnum } from "./enums/index";
const filename = process.argv[2];

const data = fs.readFileSync(filename, "utf-8").trim();

const commands = data.split("\n");

const app = new RideSharingApp();
for (const commandLine of commands) {
  const [command, ...args] = commandLine.trim().split(" ");

  switch (command) {
    case CommandsEnum.ADD_DRIVER: {
      const [driverId, x, y] = args;
      app.addDriver(driverId, Number(x), Number(y));
      break;
    }
    case CommandsEnum.ADD_RIDER: {
      const [riderId, x, y] = args;
      app.addRider(riderId, Number(x), Number(y));
      break;
    }
    case CommandsEnum.MATCH: {
      const [riderId] = args;
      app.match(riderId);
      break;
    }
    case CommandsEnum.START_RIDE: {
      const [rideId, n, riderId] = args;
      app.startRide(rideId, Number(n), riderId);
      break;
    }
    case CommandsEnum.STOP_RIDE: {
      const [rideId, destinationX, destinationY, timeTakenInMins] = args;
      app.stopRide(
        rideId,
        Number(destinationX),
        Number(destinationY),
        Number(timeTakenInMins)
      );
      break;
    }
    case CommandsEnum.BILL:
      const [rideId] = args;
      app.bill(rideId);
      break;

    default:
      break;
  }
}
