import { calculateDistance } from "../utils/common.utils";
import { BaseUser } from "./base-user.class";
import { Ride } from "./ride.class";
import { Rider } from "./rider.class";

export class Driver extends BaseUser {
  private _isAvailable: boolean = true;

  get isAvailable() {
    return this._isAvailable;
  }

  calcDistance(rider: Rider) {
    const { x: x1, y: y1 } = this._location;
    const { x: x2, y: y2 } = rider.location;
    return calculateDistance(x1, y2, x2, y2);
  }

  startRide(rideId: string, driver: Driver, rider: Rider) {
    const ride = new Ride(rideId, driver, rider);
    driver._isAvailable = false;
    return ride;
  }

  markAvailable() {
    this._isAvailable = true;
  }
}
