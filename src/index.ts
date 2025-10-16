import { RideSharingApp } from "./classes/ride-sharing-app.class";

const app = new RideSharingApp();

app.addDriver("D1", 1, 1);
app.addDriver("D2", 4, 5);
app.addDriver("D3", 2, 2);
app.addRider("R1", 0, 0);
app.match("R1");
app.startRide("RIDE-001", 2, "R1");
app.stopRide("RIDE-001", 4, 5, 32);
app.bill("RIDE-001");
