import { ILocation } from "../interfaces";
import { calculateDistance, parseNumber } from "../utils/common.utils";
import { Driver } from "./driver.class";
import { Rider } from "./rider.class";

export class Ride {
  private _id: string;
  private _driver: Driver;
  private _rider: Rider;
  private _destination: ILocation | null = null;
  private _timeTaken: number = 0;

  get driver() {
    return this._driver;
  }

  constructor(id: string, driver: Driver, rider: Rider) {
    this._id = id;
    this._driver = driver;
    this._rider = rider;
  }

  stopRide(destinationX: number, destinationY: number, timeTaken: number) {
    this._destination = {
      x: destinationX,
      y: destinationY,
    };
    this._timeTaken = timeTaken;
    this._driver.markAvailable();
  }

  isCompleted() {
    return !!this._destination;
  }

  calcDistance() {
    if (!this._destination) return 0;

    const { x: x1, y: y1 } = this._destination;
    const { x: x2, y: y2 } = this._rider.location;

    const distance = calculateDistance(x1, y1, x2, y2);
    return distance;
  }

  generateBill() {
    const baseFare = 50;

    const distance = this.calcDistance();
    const distanceCharges = parseNumber(distance * 6.5);

    const timeCharges = parseNumber(this._timeTaken * 2);

    const preTaxTotal = baseFare + distanceCharges + timeCharges;
    const tax = parseNumber(0.2 * preTaxTotal);

    return preTaxTotal + tax;
  }
}
