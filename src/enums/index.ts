/**
 * Error codes used throughout the ride-sharing application
 */
export enum ErrorCodesEnum {
  /** No drivers available within the matching radius */
  NO_DRIVERS_AVAILABLE = "NO_DRIVERS_AVAILABLE",
  /** Invalid ride operation or ride not found */
  INVALID_RIDE = "INVALID_RIDE",
  /** Attempted to bill a ride that hasn't been completed */
  RIDE_NOT_COMPLETED = "RIDE_NOT_COMPLETED",
}

/**
 * Available commands for the ride-sharing application
 */
export enum CommandsEnum {
  /** Add a new driver to the system */
  ADD_DRIVER = "ADD_DRIVER",
  /** Add a new rider to the system */
  ADD_RIDER = "ADD_RIDER",
  /** Match available drivers for a rider */
  MATCH = "MATCH",
  /** Start a ride with a selected driver */
  START_RIDE = "START_RIDE",
  /** Stop an ongoing ride */
  STOP_RIDE = "STOP_RIDE",
  /** Generate bill for a completed ride */
  BILL = "BILL",
}
