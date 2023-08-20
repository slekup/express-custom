/**
 * ExpressCustomError class.
 */
export default class ExpressCustomError extends Error {
  /**
   * The constructor of the ExpressCustomError class.
   * @param message The message of the error.
   */
  public constructor(message: string) {
    super(message);
    this.name = 'ExpressCustomError';
    this.stack = '';
  }
}
