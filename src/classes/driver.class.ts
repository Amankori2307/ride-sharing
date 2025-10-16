import { calculateDistance } from "../utils";
import { BaseUser } from "./base-user.class";
import { Rider } from "./rider.class";

/**
 * Represents a driver in the ride-sharing system
 */
export class Driver extends BaseUser {
  private _isAvailable: boolean = true;

  /**
   * Gets the driver's availability status
   * @returns True if driver is available, false otherwise
   */
  get isAvailable(): boolean {
    return this._isAvailable;
  }

  /**
   * Calculates the distance between this driver and a rider
   * @param rider - The rider to calculate distance to
   * @returns Distance in kilometers
   */
  calcDistance(rider: Rider): number {
    const { x: x1, y: y1 } = this._location;
    const { x: x2, y: y2 } = rider.location;
    return calculateDistance(x1, y1, x2, y2);
  }

  /**
   * Marks the driver as available for new rides
   */
  markAvailable(): void {
    this._isAvailable = true;
  }

  /**
   * Marks the driver as unavailable (busy with a ride)
   */
  markUnAvailable(): void {
    this._isAvailable = false;
  }
}
