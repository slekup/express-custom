/**
 * PackageError class.
 */
export default class PackageError extends Error {
  /**
   * The constructor of the PackageError class.
   * @param message The message of the error.
   */
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, PackageError.prototype);
    this.name = 'PackageError';
    this.stack = '';
  }
}
