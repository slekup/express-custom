import { NextFunction, Request, Response } from 'express';

export type IController = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type UserController = (
  req: Request,
  res: Response
) => Promise<unknown> | unknown;

/**
 * The Controller class, used to make a controller function for an endpoint.
 */
export default class Controller {
  public callback: UserController;

  /**
   * Creates a new instance of the Controller class.
   * @param callback The callback function for the controller.
   */
  public constructor(callback: UserController) {
    this.callback = callback;
  }
}
