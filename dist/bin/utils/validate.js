"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateImage = exports.validatePath = exports.validateUrl = exports.validateColor = exports.validateIpv4Address = exports.validatePhoneNumber = exports.valiedatePassword = exports.validateUsername = exports.validateEmail = exports.validateTime = exports.timeToCronExpression = exports.validateCronExpression = void 0;
/**
 * Validate a cron expression.
 * @param expression The cron expression to validate.
 * @returns Whether the cron expression is valid.
 */
const validateCronExpression = (expression) => {
    const cronExpressionRegex = /^(\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2})$/;
    return cronExpressionRegex.test(expression);
};
exports.validateCronExpression = validateCronExpression;
/**
 * Convert a time to cron time.
 * @param time The time to convert to cron time.
 * @returns The converted time.
 */
const timeToCronExpression = (time) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regular expression to validate HH:MM format
    // Check if the time matches the HH:MM format
    if (timeRegex.test(time)) {
        const [hours, minutes] = time.split(':'); // Split the time into hours and minutes
        if (!hours || !minutes)
            return null; // Return null if the time is invalid
        // Format hours and minutes for cron time
        const cronHours = hours === '00' ? '0' : hours.replace(/^0+/, ''); // Remove leading zeros, except for '00'
        const cronMinutes = minutes.replace(/^0+/, ''); // Remove leading zeros
        return `${cronMinutes} ${cronHours} * * *`; // Return the cron time format
    }
    return null; // Return null if the time is invalid
};
exports.timeToCronExpression = timeToCronExpression;
/**
 * Validate a time.
 * @param time The time to validate.
 * @returns Whether the time is valid.
 */
const validateTime = (time) => {
    const timeRegex = /^(?:[01]\d|2[0-3]):(?:00|30)$/; // Regular expression to validate HH:MM format
    return timeRegex.test(time);
};
exports.validateTime = validateTime;
/**
 * Tests if a string is empty.
 * @param str The string to test.
 * @returns True if the string is empty, false otherwise.
 */
const validateEmail = (str) => {
    // /^\S+@\S+\.\S+$/
    // /\S+@\S+\.\S+/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
};
exports.validateEmail = validateEmail;
/**
 * Tests if a username is valid.
 * @param str The username to test.
 * @returns True if the username is valid, false otherwise.
 */
const validateUsername = (str) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(str);
};
exports.validateUsername = validateUsername;
/**
 * Tests if a password is valid.
 * @param str The password to test.
 * @returns True if the password is valid, false otherwise.
 */
const valiedatePassword = (str) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(str);
};
exports.valiedatePassword = valiedatePassword;
/**
 * Tests if a phone number is valid.
 * @param str The phone number to test.
 * @returns True if the phone number is valid, false otherwise.
 */
const validatePhoneNumber = (str) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(str);
};
exports.validatePhoneNumber = validatePhoneNumber;
/**
 * Tests if a ipv4 address is valid.
 * @param str The IPv4 address to test.
 * @returns True if the IPv4 address is valid, false otherwise.
 */
const validateIpv4Address = (str) => {
    // ^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$ - https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
    const ipv4AddressRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
    return ipv4AddressRegex.test(str);
};
exports.validateIpv4Address = validateIpv4Address;
/**
 * Tests if a color is valid.
 * @param color The color string to test.
 * @returns True if the color is valid, false otherwise.
 */
const validateColor = (color) => {
    // Remove any whitespace from the input
    const cleanedColor = color.replace(/\s/g, '');
    // Check if the input matches a valid hex color pattern
    if (/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(cleanedColor)) {
        // If it does, add a '#' if it's missing and return the cleanedColor
        return cleanedColor.startsWith('#');
    }
    return false;
};
exports.validateColor = validateColor;
/**
 * Tests if a url is valid.
 * @param url The url to test.
 * @returns True if the url is valid, false otherwise.
 */
const validateUrl = (url) => {
    // Check if the url is valid
    try {
        const urlObject = new URL(url);
        return urlObject.href === url; // Additional check to handle relative URLs
    }
    catch (err) {
        return false;
    }
};
exports.validateUrl = validateUrl;
/**
 * Tests if a path is valid.
 * @param path The path to test.
 * @returns True if the path is valid, false otherwise.
 */
const validatePath = (path) => {
    const pathRegex = /^\/(?:[a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]*$/;
    return pathRegex.test(path);
};
exports.validatePath = validatePath;
/**
 * Tests if an image is valid.
 * @param image The image to test.
 * @returns True if the image is valid, false otherwise.
 */
const validateImage = (image) => {
    // Check if the image is valid
    try {
        const imageObject = new URL(image);
        return imageObject.href === image; // Additional check to handle relative URLs
    }
    catch (err) {
        return false;
    }
};
exports.validateImage = validateImage;
