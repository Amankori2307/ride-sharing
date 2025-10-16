import { BASE_FARE, PER_KM_CHARGES, PER_MIN_CHARGES, TAX_PERCENTAGE } from "../constants";

/**
 * Application configuration constants
 */
export const APP_CONFIG = {
  /**
   * Driver matching configuration
   */
  MATCHING: {
    /** Maximum distance in km for driver matching */
    MAX_DISTANCE: 5,
    /** Maximum number of drivers to return in match results */
    MAX_DRIVERS: 5
  },
  
  /**
   * Billing configuration
   */
  BILLING: {
    /** Base fare for any ride */
    BASE_FARE,
    /** Charges per kilometer traveled */
    PER_KM_CHARGES,
    /** Charges per minute of ride time */
    PER_MIN_CHARGES,
    /** Tax percentage applied to total fare */
    TAX_PERCENTAGE
  },
  
  /**
   * Application limits and constraints
   */
  LIMITS: {
    /** Maximum number of active rides per driver */
    MAX_RIDES_PER_DRIVER: 1,
    /** Minimum coordinate value allowed */
    MIN_COORDINATE: 0,
    /** Maximum coordinate value allowed */
    MAX_COORDINATE: 1000
  }
} as const;

/**
 * Type for the application configuration
 */
export type AppConfig = typeof APP_CONFIG;