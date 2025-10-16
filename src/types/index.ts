import { Driver } from "../classes/driver.class";

/**
 * Represents a driver with calculated distance from a rider
 */
export type DriverWithDistance = {
  distance: number;
  driver: Driver;
};

/**
 * Detailed breakdown of ride billing components
 */
export type BillDetails = {
  baseFare: number;
  distanceCharges: number;
  timeCharges: number;
  tax: number;
  total: number;
};

/**
 * Result of driver matching operation
 */
export type MatchResult = {
  success: boolean;
  drivers: string[];
  message: string;
  error?: string;
};

/**
 * Result of ride operations
 */
export type RideOperationResult = {
  success: boolean;
  message: string;
  error?: string;
};

/**
 * Application command types
 */
export type CommandResult = {
  success: boolean;
  output: string;
  error?: string;
};

/**
 * Ride status enumeration
 */
export enum RideStatus {
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

/**
 * Driver availability status
 */
export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY'
}