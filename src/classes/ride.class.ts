import {
  BASE_FARE,
  PER_KM_CHARGES,
  PER_MIN_CHARGES,
  TAX_PERCENTAGE,
} from "../constants";
import { ILocation } from "../interfaces";
import { calculateDistance, parseNumber } from "../utils";
import { Driver } from "./driver.class";
import { Rider } from "./rider.class";

/**
 * Represents a ride in the ride-sharing system
 */
export class Ride {
  private _id: string;
  private _driver: Driver;
  private _rider: Rider;
  private _destination: ILocation | null = null;
  private _timeTakenInMins: number = 0;

  /**
   * Gets the driver assigned to this ride
   * @returns The driver object
   */
  get driver(): Driver {
    return this._driver;
  }

  /**
   * Creates a new ride instance
   * @param id - Unique identifier for the ride
   * @param driver - Driver assigned to the ride
   * @param rider - Rider requesting the ride
   */
  constructor(id: string, driver: Driver, rider: Rider) {
    this._id = id;
    this._driver = driver;
    this._rider = rider;
  }

  /**
   * Stops the ride and records destination and time taken
   * @param destinationX - X coordinate of the destination
   * @param destinationY - Y coordinate of the destination
   * @param timeTakenInMins - Total time taken for the ride in minutes
   */
  stopRide(
    destinationX: number,
    destinationY: number,
    timeTakenInMins: number
  ): void {
    this._destination = {
      x: destinationX,
      y: destinationY,
    };
    this._timeTakenInMins = timeTakenInMins;
    this._driver.markAvailable();
  }

  /**
   * Checks if the ride has been completed
   * @returns True if ride is completed, false otherwise
   */
  isCompleted(): boolean {
    return !!this._destination;
  }

  /**
   * Calculates the distance traveled during the ride
   * @returns Distance in kilometers, or 0 if ride not completed
   */
  calcDistanceInKm(): number {
    if (!this._destination) return 0;

    const { x: x1, y: y1 } = this._destination;
    const { x: x2, y: y2 } = this._rider.location;

    const distance = calculateDistance(x1, y1, x2, y2);
    return distance;
  }

  /**
   * Generates the total bill for the completed ride
   * @returns Total amount including base fare, distance charges, time charges, and tax
   */
  generateBill(): number {
    const baseFare = BASE_FARE;

    const distanceInKm = this.calcDistanceInKm();
    const distanceCharges = parseNumber(distanceInKm * PER_KM_CHARGES);

    const timeCharges = parseNumber(this._timeTakenInMins * PER_MIN_CHARGES);

    const preTaxTotal = baseFare + distanceCharges + timeCharges;
    const tax = parseNumber((TAX_PERCENTAGE / 100) * preTaxTotal);

    return preTaxTotal + tax;
  }
}
