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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7R0FJRztBQUNJLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxVQUFrQixFQUFXLEVBQUU7SUFDcEUsTUFBTSxtQkFBbUIsR0FDdkIsOEpBQThKLENBQUM7SUFDakssT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBSlcsUUFBQSxzQkFBc0IsMEJBSWpDO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxJQUFZLEVBQWlCLEVBQUU7SUFDbEUsTUFBTSxTQUFTLEdBQUcsNkJBQTZCLENBQUMsQ0FBQyw4Q0FBOEM7SUFFL0YsNkNBQTZDO0lBQzdDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QixNQUFNLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyx3Q0FBd0M7UUFFbEYsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU87WUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLHFDQUFxQztRQUUxRSx5Q0FBeUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztRQUMzRyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUV2RSxPQUFPLEdBQUcsV0FBVyxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUMsOEJBQThCO0tBQzNFO0lBRUQsT0FB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LE1BQU0sU0FBUyxHQUFHLHVDQUF1QyxDQUFDO0lBQzFELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUM7QUFIVyxRQUFBLFlBQVksZ0JBR3ZCO0FBRUY7Ozs7R0FJRztBQUNJLE1BQU0sYUFBYSxHQUFHLENBQUMsS0FBYSxFQUFXLEVBQUU7SUFDdEQsOEJBQThCO0lBQzlCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLFdBQVcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsMkNBQTJDO0tBQy9FO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDO0FBUlcsUUFBQSxhQUFhLGlCQVF4QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVmFsaWRhdGUgYSBjcm9uIGV4cHJlc3Npb24uXG4gKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgY3JvbiBleHByZXNzaW9uIHRvIHZhbGlkYXRlLlxuICogQHJldHVybnMgV2hldGhlciB0aGUgY3JvbiBleHByZXNzaW9uIGlzIHZhbGlkLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcm9uRXhwcmVzc2lvbiA9IChleHByZXNzaW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgY3JvbkV4cHJlc3Npb25SZWdleCA9XG4gICAgL14oXFwqfFswLTldezEsMn18XFwqXFwvWzAtOV17MSwyfSkgKFxcKnxbMC05XXsxLDJ9fFxcKlxcL1swLTldezEsMn0pIChcXCp8WzAtOV17MSwyfXxcXCpcXC9bMC05XXsxLDJ9KSAoXFwqfFswLTldezEsMn18XFwqXFwvWzAtOV17MSwyfSkgKFxcKnxbMC05XXsxLDJ9fFxcKlxcL1swLTldezEsMn0pJC87XG4gIHJldHVybiBjcm9uRXhwcmVzc2lvblJlZ2V4LnRlc3QoZXhwcmVzc2lvbik7XG59O1xuXG4vKipcbiAqIENvbnZlcnQgYSB0aW1lIHRvIGNyb24gdGltZS5cbiAqIEBwYXJhbSB0aW1lIFRoZSB0aW1lIHRvIGNvbnZlcnQgdG8gY3JvbiB0aW1lLlxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCB0aW1lLlxuICovXG5leHBvcnQgY29uc3QgdGltZVRvQ3JvbkV4cHJlc3Npb24gPSAodGltZTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHRpbWVSZWdleCA9IC9eKFswMV1cXGR8MlswLTNdKTooWzAtNV1cXGQpJC87IC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byB2YWxpZGF0ZSBISDpNTSBmb3JtYXRcblxuICAvLyBDaGVjayBpZiB0aGUgdGltZSBtYXRjaGVzIHRoZSBISDpNTSBmb3JtYXRcbiAgaWYgKHRpbWVSZWdleC50ZXN0KHRpbWUpKSB7XG4gICAgY29uc3QgW2hvdXJzLCBtaW51dGVzXSA9IHRpbWUuc3BsaXQoJzonKTsgLy8gU3BsaXQgdGhlIHRpbWUgaW50byBob3VycyBhbmQgbWludXRlc1xuXG4gICAgaWYgKCFob3VycyB8fCAhbWludXRlcykgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZSB0aW1lIGlzIGludmFsaWRcblxuICAgIC8vIEZvcm1hdCBob3VycyBhbmQgbWludXRlcyBmb3IgY3JvbiB0aW1lXG4gICAgY29uc3QgY3JvbkhvdXJzID0gaG91cnMgPT09ICcwMCcgPyAnMCcgOiBob3Vycy5yZXBsYWNlKC9eMCsvLCAnJyk7IC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zLCBleGNlcHQgZm9yICcwMCdcbiAgICBjb25zdCBjcm9uTWludXRlcyA9IG1pbnV0ZXMucmVwbGFjZSgvXjArLywgJycpOyAvLyBSZW1vdmUgbGVhZGluZyB6ZXJvc1xuXG4gICAgcmV0dXJuIGAke2Nyb25NaW51dGVzfSAke2Nyb25Ib3Vyc30gKiAqICpgOyAvLyBSZXR1cm4gdGhlIGNyb24gdGltZSBmb3JtYXRcbiAgfVxuXG4gIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0aGUgdGltZSBpcyBpbnZhbGlkXG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIGEgdGltZS5cbiAqIEBwYXJhbSB0aW1lIFRoZSB0aW1lIHRvIHZhbGlkYXRlLlxuICogQHJldHVybnMgV2hldGhlciB0aGUgdGltZSBpcyB2YWxpZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlVGltZSA9ICh0aW1lOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgdGltZVJlZ2V4ID0gL14oPzpbMDFdXFxkfDJbMC0zXSk6KD86MDB8MzApJC87IC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byB2YWxpZGF0ZSBISDpNTSBmb3JtYXRcbiAgcmV0dXJuIHRpbWVSZWdleC50ZXN0KHRpbWUpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHN0cmluZyBpcyBlbXB0eS5cbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgc3RyaW5nIGlzIGVtcHR5LCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVtYWlsID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIC8vIC9eXFxTK0BcXFMrXFwuXFxTKyQvXG4gIC8vIC9cXFMrQFxcUytcXC5cXFMrL1xuICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG4gIHJldHVybiBlbWFpbFJlZ2V4LnRlc3Qoc3RyKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSB1c2VybmFtZSBpcyB2YWxpZC5cbiAqIEBwYXJhbSBzdHIgVGhlIHVzZXJuYW1lIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSB1c2VybmFtZSBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVVc2VybmFtZSA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB1c2VybmFtZVJlZ2V4ID0gL15bYS16QS1aMC05X117MywxNn0kLztcbiAgcmV0dXJuIHVzZXJuYW1lUmVnZXgudGVzdChzdHIpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHBhc3N3b3JkIGlzIHZhbGlkLlxuICogQHBhcmFtIHN0ciBUaGUgcGFzc3dvcmQgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBhc3N3b3JkIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZWRhdGVQYXNzd29yZCA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXNzd29yZFJlZ2V4ID0gL14oPz0uKlthLXpdKSg/PS4qW0EtWl0pKD89LipcXGQpW2EtekEtWlxcZF17OCx9JC87XG4gIHJldHVybiBwYXNzd29yZFJlZ2V4LnRlc3Qoc3RyKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSBwaG9uZSBudW1iZXIgaXMgdmFsaWQuXG4gKiBAcGFyYW0gc3RyIFRoZSBwaG9uZSBudW1iZXIgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBob25lIG51bWJlciBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVQaG9uZU51bWJlciA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwaG9uZU51bWJlclJlZ2V4ID0gL15cXGR7MTB9JC87XG4gIHJldHVybiBwaG9uZU51bWJlclJlZ2V4LnRlc3Qoc3RyKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSBpcHY0IGFkZHJlc3MgaXMgdmFsaWQuXG4gKiBAcGFyYW0gc3RyIFRoZSBJUHY0IGFkZHJlc3MgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIElQdjQgYWRkcmVzcyBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJcHY0QWRkcmVzcyA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAvLyBeKCgyNVswLTVdfCgyWzAtNF18MVxcZHxbMS05XXwpXFxkKVxcLj9cXGIpezR9JCAtIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUyODQxNDcvdmFsaWRhdGluZy1pcHY0LWFkZHJlc3Nlcy13aXRoLXJlZ2V4cFxuICBjb25zdCBpcHY0QWRkcmVzc1JlZ2V4ID1cbiAgICAvXigoMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KShcXC58JCkpezR9JC87XG4gIHJldHVybiBpcHY0QWRkcmVzc1JlZ2V4LnRlc3Qoc3RyKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSBjb2xvciBpcyB2YWxpZC5cbiAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igc3RyaW5nIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBjb2xvciBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDb2xvciA9IChjb2xvcjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIC8vIFJlbW92ZSBhbnkgd2hpdGVzcGFjZSBmcm9tIHRoZSBpbnB1dFxuICBjb25zdCBjbGVhbmVkQ29sb3IgPSBjb2xvci5yZXBsYWNlKC9cXHMvZywgJycpO1xuXG4gIC8vIENoZWNrIGlmIHRoZSBpbnB1dCBtYXRjaGVzIGEgdmFsaWQgaGV4IGNvbG9yIHBhdHRlcm5cbiAgaWYgKC9eIz9bMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8udGVzdChjbGVhbmVkQ29sb3IpKSB7XG4gICAgLy8gSWYgaXQgZG9lcywgYWRkIGEgJyMnIGlmIGl0J3MgbWlzc2luZyBhbmQgcmV0dXJuIHRoZSBjbGVhbmVkQ29sb3JcbiAgICByZXR1cm4gY2xlYW5lZENvbG9yLnN0YXJ0c1dpdGgoJyMnKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSB1cmwgaXMgdmFsaWQuXG4gKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVybCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVVcmwgPSAodXJsOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgLy8gQ2hlY2sgaWYgdGhlIHVybCBpcyB2YWxpZFxuICB0cnkge1xuICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsKTtcbiAgICByZXR1cm4gdXJsT2JqZWN0LmhyZWYgPT09IHVybDsgLy8gQWRkaXRpb25hbCBjaGVjayB0byBoYW5kbGUgcmVsYXRpdmUgVVJMc1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYSBwYXRoIGlzIHZhbGlkLlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBhdGggaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlUGF0aCA9IChwYXRoOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGF0aFJlZ2V4ID0gL15cXC8oPzpbYS16QS1aMC05X10rXFwvKT9bYS16QS1aMC05X10qJC87XG4gIHJldHVybiBwYXRoUmVnZXgudGVzdChwYXRoKTtcbn07XG5cbi8qKlxuICogVGVzdHMgaWYgYW4gaW1hZ2UgaXMgdmFsaWQuXG4gKiBAcGFyYW0gaW1hZ2UgVGhlIGltYWdlIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBpbWFnZSBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJbWFnZSA9IChpbWFnZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIC8vIENoZWNrIGlmIHRoZSBpbWFnZSBpcyB2YWxpZFxuICB0cnkge1xuICAgIGNvbnN0IGltYWdlT2JqZWN0ID0gbmV3IFVSTChpbWFnZSk7XG4gICAgcmV0dXJuIGltYWdlT2JqZWN0LmhyZWYgPT09IGltYWdlOyAvLyBBZGRpdGlvbmFsIGNoZWNrIHRvIGhhbmRsZSByZWxhdGl2ZSBVUkxzXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbiJdfQ==