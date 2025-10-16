import { APP_CONFIG } from "../config";
import { ErrorCodesEnum } from "../enums";
import { DriverWithDistance } from "../types";
import { Driver } from "./driver.class";
import { Ride } from "./ride.class";
import { Rider } from "./rider.class";

/**
 * Main application class that manages ride-sharing operations
 */
export class RideSharingApp {
  private ridersMap: Map<string, Rider> = new Map<string, Rider>();
  private drivers: Array<Driver> = [];
  private rideMap: Map<string, Ride> = new Map<string, Ride>();
  private matchedDriversMap: Map<string, Array<Driver>> = new Map<
    string,
    Array<Driver>
  >();

  constructor() {}

  /**
   * Adds a new driver to the system
   * @param driverId - Unique identifier for the driver
   * @param x - X coordinate of driver's location
   * @param y - Y coordinate of driver's location
   */
  addDriver(driverId: string, x: number, y: number): void {
    const driver = new Driver(driverId, { x, y });
    this.drivers.push(driver);
  }

  /**
   * Adds a new rider to the system
   * @param riderId - Unique identifier for the rider
   * @param x - X coordinate of rider's location
   * @param y - Y coordinate of rider's location
   */
  addRider(riderId: string, x: number, y: number): void {
    const rider = new Rider(riderId, { x, y });
    this.ridersMap.set(riderId, rider);
  }

  /**
   * Retrieves a rider by their ID
   * @param riderId - Unique identifier for the rider
   * @returns The rider object or undefined if not found
   */
  getRider(riderId: string): Rider | undefined {
    return this.ridersMap.get(riderId);
  }

  /**
   * Matches available drivers within configured distance for a rider
   * @param riderId - Unique identifier for the rider requesting a match
   */
  match(riderId: string): void {
    const rider = this.getRider(riderId);
    if (!rider) return;

    const driversWithDistance: Array<DriverWithDistance> = this.drivers
      .map((driver) => {
        return {
          distance: driver.calcDistance(rider),
          driver,
        };
      })
      .filter((driver) => driver.distance <= APP_CONFIG.MATCHING.MAX_DISTANCE);

    driversWithDistance.sort((a, b) => {
      // Primary: distance
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }

      // Secondary: driver.id (string)
      return a.driver.id.localeCompare(b.driver.id);
    });

    const finalDrivers = driversWithDistance
      .slice(0, APP_CONFIG.MATCHING.MAX_DRIVERS)
      .map((driver) => driver.driver);

    this.matchedDriversMap.set(riderId, finalDrivers);

    if (finalDrivers.length === 0) {
      console.log(ErrorCodesEnum.NO_DRIVERS_AVAILABLE);
      return;
    }

    console.log(
      `DRIVERS_MATCHED ${finalDrivers.map((driver) => driver.id).join(" ")}`
    );
  }

  /**
   * Starts a ride with the nth matched driver for a rider
   * @param rideId - Unique identifier for the ride
   * @param n - Position of driver in matched list (1-indexed)
   * @param riderId - Unique identifier for the rider
   */
  startRide(rideId: string, n: number, riderId: string): void {
    const drivers = this.matchedDriversMap.get(riderId) || [];

    if (drivers.length < n) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    const driver = drivers[n - 1];
    if (!driver.isAvailable) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    const ride = this.rideMap.get(rideId);
    if (ride) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    const rider = this.getRider(riderId);
    if (!rider) return;

    const newRide = new Ride(rideId, driver, rider);
    driver.markUnAvailable();
    this.rideMap.set(rideId, newRide);
    console.log(`RIDE_STARTED ${rideId}`);
  }

  /**
   * Stops an active ride and records the destination and time taken
   * @param rideId - Unique identifier for the ride
   * @param destinationX - X coordinate of the destination
   * @param destinationY - Y coordinate of the destination
   * @param timeTakenInMins - Total time taken for the ride in minutes
   */
  stopRide(
    rideId: string,
    destinationX: number,
    destinationY: number,
    timeTakenInMins: number
  ): void {
    const ride = this.rideMap.get(rideId);
    if (!ride) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    ride.stopRide(destinationX, destinationY, timeTakenInMins);
    console.log(`RIDE_STOPPED ${rideId}`);
  }

  /**
   * Generates and displays the bill for a completed ride
   * @param rideId - Unique identifier for the ride
   */
  bill(rideId: string): void {
    const ride = this.rideMap.get(rideId);
    if (!ride) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    if (!ride.isCompleted()) {
      console.log(ErrorCodesEnum.RIDE_NOT_COMPLETED);
      return;
    }

    const billAmount = ride.generateBill();
    console.log(`BILL ${rideId} ${ride.driver.id} ${billAmount.toFixed(2)}`);
  }
}
