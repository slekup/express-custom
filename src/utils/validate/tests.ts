/**
 * Tests if a string is empty.
 * @param str The string to test.
 * @returns True if the string is empty, false otherwise.
 */
export const email = (str: string): boolean => {
  // /^\S+@\S+\.\S+$/
  // /\S+@\S+\.\S+/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
};

/**
 * Tests if a username is valid.
 * @param str The username to test.
 * @returns True if the username is valid, false otherwise.
 */
export const username = (str: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  return usernameRegex.test(str);
};

/**
 * Tests if a password is valid.
 * @param str The password to test.
 * @returns True if the password is valid, false otherwise.
 */
export const password = (str: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(str);
};

/**
 * Tests if a phone number is valid.
 * @param str The phone number to test.
 * @returns True if the phone number is valid, false otherwise.
 */
export const phone = (str: string): boolean => {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(str);
};

/**
 * Tests if a ipv4 address is valid.
 * @param str The IPv4 address to test.
 * @returns True if the IPv4 address is valid, false otherwise.
 */
export const ipv4Address = (str: string): boolean => {
  // ^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$ - https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
  const ipv4AddressRegex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
  return ipv4AddressRegex.test(str);
};

/**
 * Tests if a color is valid.
 * @param color The color string to test.
 * @returns True if the color is valid, false otherwise.
 */
export const color = (color: string): boolean => {
  // Remove any whitespace from the input
  const cleanedColor = color.replace(/\s/g, '');

  // Check if the input matches a valid hex color pattern
  if (/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleanedColor)) {
    // If it does, add a '#' if it's missing and return the cleanedColor
    return cleanedColor.startsWith('#');
  }

  return false;
};

/**
 * Tests if a url is valid.
 * @param url The url to test.
 * @returns True if the url is valid, false otherwise.
 */
export const url = (url: string): boolean => {
  // Check if the url is valid
  try {
    const urlObject = new URL(url);
    return urlObject.href === url; // Additional check to handle relative URLs
  } catch (err) {
    return false;
  }
};

/**
 * Tests if an image is valid.
 * @param image The image to test.
 * @returns True if the image is valid, false otherwise.
 */
export const image = (image: string): boolean => {
  // Check if the image is valid
  try {
    const imageObject = new URL(image);
    return imageObject.href === image; // Additional check to handle relative URLs
  } catch (err) {
    return false;
  }
};
