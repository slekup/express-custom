import { UserController } from '@typings/builders';

/**
 * The Controller class, used to make a controller function for an endpoint.
 */
export default class Controller<T = unknown> {
  public callback: UserController<T>;

  /**
   * Creates a new instance of the Controller class.
   * @param callback The callback function for the controller.
   */
  public constructor(callback: UserController<T>) {
    this.callback = callback;
  }
}
