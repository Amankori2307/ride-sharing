import { calculateDistance } from "../utils";
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
    return calculateDistance(x1, y1, x2, y2);
  }

  markAvailable() {
    this._isAvailable = true;
  }

  markUnAvailable() {
    this._isAvailable = false;
  }
}
