import { ErrorCodesEnum } from "../enums";

/**
 * Custom error class for ride-sharing application errors
 */
export class RideError extends Error {
  public readonly code: ErrorCodesEnum;

  constructor(code: ErrorCodesEnum, message?: string) {
    super(message || code);
    this.name = 'RideError';
    this.code = code;
  }
}

/**
 * Error for invalid ride operations
 */
export class InvalidRideError extends RideError {
  constructor(rideId: string) {
    super(ErrorCodesEnum.INVALID_RIDE, `Invalid ride operation for ride: ${rideId}`);
  }
}

/**
 * Error when no drivers are available for matching
 */
export class NoDriversAvailableError extends RideError {
  constructor(riderId: string) {
    super(ErrorCodesEnum.NO_DRIVERS_AVAILABLE, `No drivers available for rider: ${riderId}`);
  }
}

/**
 * Error when attempting to bill an incomplete ride
 */
export class RideNotCompletedError extends RideError {
  constructor(rideId: string) {
    super(ErrorCodesEnum.RIDE_NOT_COMPLETED, `Ride ${rideId} is not completed yet`);
  }
}