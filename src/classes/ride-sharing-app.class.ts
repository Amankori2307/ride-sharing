import { ErrorCodesEnum } from "../enum";
import { Driver } from "./driver.class";
import { Ride } from "./ride.class";
import { Rider } from "./rider.class";

export class RideSharingApp {
  private ridersMap: Map<string, Rider> = new Map<string, Rider>();
  private drivers: Array<Driver> = [];
  private rideMap: Map<string, Ride> = new Map<string, Ride>();
  private matchedDriversMap: Map<string, Array<Driver>> = new Map<
    string,
    Array<Driver>
  >();

  constructor() {}

  addDriver(driverId: string, x: number, y: number) {
    const driver = new Driver(driverId, { x, y });
    this.drivers.push(driver);
  }

  addRider(riderId: string, x: number, y: number) {
    const rider = new Rider(riderId, { x, y });
    this.ridersMap.set(riderId, rider);
  }

  getRider(riderId: string) {
    return this.ridersMap.get(riderId);
  }

  match(riderId: string) {
    const rider = this.getRider(riderId);
    if (!rider) return;

    const driversWithDistance: Array<{
      distance: number;
      driver: Driver;
    }> = this.drivers
      .map((driver) => {
        return {
          distance: driver.calcDistance(rider),
          driver,
        };
      })
      .filter((driver) => driver.distance <= 5);

    driversWithDistance.sort((a, b) => {
      // Primary: distance
      if (a.distance !== b.distance) {
        return a.distance - b.distance;
      }

      // Secondary: driver.id (string)
      return a.driver.id.localeCompare(b.driver.id);
    });

    const finalDrivers = driversWithDistance
      .slice(0, 5)
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

  startRide(rideId: string, n: number, riderId: string) {
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

    const newRide = driver.startRide(rideId, driver, rider);
    this.rideMap.set(rideId, newRide);
    console.log(`RIDE_STARTED ${rideId}`);
  }

  stopRide(
    rideId: string,
    destinationX: number,
    destinationY: number,
    timeTaken: number
  ) {
    const ride = this.rideMap.get(rideId);
    if (!ride) {
      console.log(ErrorCodesEnum.INVALID_RIDE);
      return;
    }

    ride.stopRide(destinationX, destinationY, timeTaken);
    console.log(`RIDE_STOPPED ${rideId}`);
  }

  bill(rideId: string) {
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
