import { ILocation } from "../interfaces";

/**
 * Base class for all users in the ride-sharing system
 */
export class BaseUser {
  protected _id: string;
  protected _location: ILocation;

  /**
   * Creates a new user instance
   * @param id - Unique identifier for the user
   * @param location - Geographic location of the user
   */
  constructor(id: string, location: ILocation) {
    this._id = id;
    this._location = location;
  }

  /**
   * Gets the user's unique identifier
   * @returns The user ID
   */
  get id(): string {
    return this._id;
  }

  /**
   * Gets the user's current location
   * @returns The user's location coordinates
   */
  get location(): ILocation {
    return this._location;
  }
}
