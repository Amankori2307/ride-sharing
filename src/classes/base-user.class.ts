import { ILocation } from "../interfaces";

export class BaseUser {
  protected _id: string;
  protected _location: ILocation;

  constructor(id: string, location: ILocation) {
    this._id = id;
    this._location = location;
  }

  get id() {
    return this._id;
  }

  get location() {
    return this._location;
  }
}
