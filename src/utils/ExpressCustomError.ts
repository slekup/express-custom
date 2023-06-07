/**
 * PackageError class.
 */
export default class ExpressCustomError extends Error {
  /**
   * The constructor of the PackageError class.
   * @param message The message of the error.
   */
  public constructor(message: string) {
    super(message);
    this.name = 'ExpressCustomError';
    this.stack = '';
  }
}
