/**
 * Validate a cron expression.
 * @param expression The cron expression to validate.
 * @returns Whether the cron expression is valid.
 */
export const validateCronExpression = (expression) => {
    const cronExpressionRegex = /^(\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2})$/;
    return cronExpressionRegex.test(expression);
};
/**
 * Convert a time to cron time.
 * @param time The time to convert to cron time.
 * @returns The converted time.
 */
export const timeToCronExpression = (time) => {
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
/**
 * Validate a time.
 * @param time The time to validate.
 * @returns Whether the time is valid.
 */
export const validateTime = (time) => {
    const timeRegex = /^(?:[01]\d|2[0-3]):(?:00|30)$/; // Regular expression to validate HH:MM format
    return timeRegex.test(time);
};
/**
 * Tests if a string is empty.
 * @param str The string to test.
 * @returns True if the string is empty, false otherwise.
 */
export const validateEmail = (str) => {
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
export const validateUsername = (str) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(str);
};
/**
 * Tests if a password is valid.
 * @param str The password to test.
 * @returns True if the password is valid, false otherwise.
 */
export const valiedatePassword = (str) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(str);
};
/**
 * Tests if a phone number is valid.
 * @param str The phone number to test.
 * @returns True if the phone number is valid, false otherwise.
 */
export const validatePhoneNumber = (str) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(str);
};
/**
 * Tests if a ipv4 address is valid.
 * @param str The IPv4 address to test.
 * @returns True if the IPv4 address is valid, false otherwise.
 */
export const validateIpv4Address = (str) => {
    // ^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$ - https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
    const ipv4AddressRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}$/;
    return ipv4AddressRegex.test(str);
};
/**
 * Tests if a color is valid.
 * @param color The color string to test.
 * @returns True if the color is valid, false otherwise.
 */
export const validateColor = (color) => {
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
export const validateUrl = (url) => {
    // Check if the url is valid
    try {
        const urlObject = new URL(url);
        return urlObject.href === url; // Additional check to handle relative URLs
    }
    catch (err) {
        return false;
    }
};
/**
 * Tests if a path is valid.
 * @param path The path to test.
 * @returns True if the path is valid, false otherwise.
 */
export const validatePath = (path) => {
    const pathRegex = /^\/(?:[a-zA-Z0-9_]+\/)?[a-zA-Z0-9_]*$/;
    return pathRegex.test(path);
};
/**
 * Tests if an image is valid.
 * @param image The image to test.
 * @returns True if the image is valid, false otherwise.
 */
export const validateImage = (image) => {
    // Check if the image is valid
    try {
        const imageObject = new URL(image);
        return imageObject.href === image; // Additional check to handle relative URLs
    }
    catch (err) {
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLENBQUMsVUFBa0IsRUFBVyxFQUFFO0lBQ3BFLE1BQU0sbUJBQW1CLEdBQ3ZCLDhKQUE4SixDQUFDO0lBQ2pLLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLElBQVksRUFBaUIsRUFBRTtJQUNsRSxNQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLDhDQUE4QztJQUUvRiw2Q0FBNkM7SUFDN0MsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztRQUVsRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMscUNBQXFDO1FBRTFFLHlDQUF5QztRQUN6QyxNQUFNLFNBQVMsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1FBQzNHLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBRXZFLE9BQU8sR0FBRyxXQUFXLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQyw4QkFBOEI7S0FDM0U7SUFFRCxPQUFPLElBQUks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YSxHQUFHLENBQUMsS0FBYSxFQUFXLEVBQUU7SUFDdEQsOEJBQThCO0lBQzlCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLFdBQVcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsMkNBQTJDO0tBQy9FO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFZhbGlkYXRlIGEgY3JvbiBleHByZXNzaW9uLlxyXG4gKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgY3JvbiBleHByZXNzaW9uIHRvIHZhbGlkYXRlLlxyXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBjcm9uIGV4cHJlc3Npb24gaXMgdmFsaWQuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDcm9uRXhwcmVzc2lvbiA9IChleHByZXNzaW9uOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBjcm9uRXhwcmVzc2lvblJlZ2V4ID1cclxuICAgIC9eKFxcKnxbMC05XXsxLDJ9fFxcKlxcL1swLTldezEsMn0pIChcXCp8WzAtOV17MSwyfXxcXCpcXC9bMC05XXsxLDJ9KSAoXFwqfFswLTldezEsMn18XFwqXFwvWzAtOV17MSwyfSkgKFxcKnxbMC05XXsxLDJ9fFxcKlxcL1swLTldezEsMn0pIChcXCp8WzAtOV17MSwyfXxcXCpcXC9bMC05XXsxLDJ9KSQvO1xyXG4gIHJldHVybiBjcm9uRXhwcmVzc2lvblJlZ2V4LnRlc3QoZXhwcmVzc2lvbik7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29udmVydCBhIHRpbWUgdG8gY3JvbiB0aW1lLlxyXG4gKiBAcGFyYW0gdGltZSBUaGUgdGltZSB0byBjb252ZXJ0IHRvIGNyb24gdGltZS5cclxuICogQHJldHVybnMgVGhlIGNvbnZlcnRlZCB0aW1lLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRpbWVUb0Nyb25FeHByZXNzaW9uID0gKHRpbWU6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHRpbWVSZWdleCA9IC9eKFswMV1cXGR8MlswLTNdKTooWzAtNV1cXGQpJC87IC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byB2YWxpZGF0ZSBISDpNTSBmb3JtYXRcclxuXHJcbiAgLy8gQ2hlY2sgaWYgdGhlIHRpbWUgbWF0Y2hlcyB0aGUgSEg6TU0gZm9ybWF0XHJcbiAgaWYgKHRpbWVSZWdleC50ZXN0KHRpbWUpKSB7XHJcbiAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpOyAvLyBTcGxpdCB0aGUgdGltZSBpbnRvIGhvdXJzIGFuZCBtaW51dGVzXHJcblxyXG4gICAgaWYgKCFob3VycyB8fCAhbWludXRlcykgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZSB0aW1lIGlzIGludmFsaWRcclxuXHJcbiAgICAvLyBGb3JtYXQgaG91cnMgYW5kIG1pbnV0ZXMgZm9yIGNyb24gdGltZVxyXG4gICAgY29uc3QgY3JvbkhvdXJzID0gaG91cnMgPT09ICcwMCcgPyAnMCcgOiBob3Vycy5yZXBsYWNlKC9eMCsvLCAnJyk7IC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zLCBleGNlcHQgZm9yICcwMCdcclxuICAgIGNvbnN0IGNyb25NaW51dGVzID0gbWludXRlcy5yZXBsYWNlKC9eMCsvLCAnJyk7IC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zXHJcblxyXG4gICAgcmV0dXJuIGAke2Nyb25NaW51dGVzfSAke2Nyb25Ib3Vyc30gKiAqICpgOyAvLyBSZXR1cm4gdGhlIGNyb24gdGltZSBmb3JtYXRcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0aGUgdGltZSBpcyBpbnZhbGlkXHJcbn07XHJcblxyXG4vKipcclxuICogVmFsaWRhdGUgYSB0aW1lLlxyXG4gKiBAcGFyYW0gdGltZSBUaGUgdGltZSB0byB2YWxpZGF0ZS5cclxuICogQHJldHVybnMgV2hldGhlciB0aGUgdGltZSBpcyB2YWxpZC5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVRpbWUgPSAodGltZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgdGltZVJlZ2V4ID0gL14oPzpbMDFdXFxkfDJbMC0zXSk6KD86MDB8MzApJC87IC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB0byB2YWxpZGF0ZSBISDpNTSBmb3JtYXRcclxuICByZXR1cm4gdGltZVJlZ2V4LnRlc3QodGltZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYSBzdHJpbmcgaXMgZW1wdHkuXHJcbiAqIEBwYXJhbSBzdHIgVGhlIHN0cmluZyB0byB0ZXN0LlxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHksIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUVtYWlsID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgLy8gL15cXFMrQFxcUytcXC5cXFMrJC9cclxuICAvLyAvXFxTK0BcXFMrXFwuXFxTKy9cclxuICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChzdHIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGEgdXNlcm5hbWUgaXMgdmFsaWQuXHJcbiAqIEBwYXJhbSBzdHIgVGhlIHVzZXJuYW1lIHRvIHRlc3QuXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVzZXJuYW1lIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVVc2VybmFtZSA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHVzZXJuYW1lUmVnZXggPSAvXlthLXpBLVowLTlfXXszLDE2fSQvO1xyXG4gIHJldHVybiB1c2VybmFtZVJlZ2V4LnRlc3Qoc3RyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiBhIHBhc3N3b3JkIGlzIHZhbGlkLlxyXG4gKiBAcGFyYW0gc3RyIFRoZSBwYXNzd29yZCB0byB0ZXN0LlxyXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBwYXNzd29yZCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZhbGllZGF0ZVBhc3N3b3JkID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFzc3dvcmRSZWdleCA9IC9eKD89LipbYS16XSkoPz0uKltBLVpdKSg/PS4qXFxkKVthLXpBLVpcXGRdezgsfSQvO1xyXG4gIHJldHVybiBwYXNzd29yZFJlZ2V4LnRlc3Qoc3RyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUZXN0cyBpZiBhIHBob25lIG51bWJlciBpcyB2YWxpZC5cclxuICogQHBhcmFtIHN0ciBUaGUgcGhvbmUgbnVtYmVyIHRvIHRlc3QuXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHBob25lIG51bWJlciBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlUGhvbmVOdW1iZXIgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwaG9uZU51bWJlclJlZ2V4ID0gL15cXGR7MTB9JC87XHJcbiAgcmV0dXJuIHBob25lTnVtYmVyUmVnZXgudGVzdChzdHIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGEgaXB2NCBhZGRyZXNzIGlzIHZhbGlkLlxyXG4gKiBAcGFyYW0gc3RyIFRoZSBJUHY0IGFkZHJlc3MgdG8gdGVzdC5cclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgSVB2NCBhZGRyZXNzIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVJcHY0QWRkcmVzcyA9IChzdHI6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIC8vIF4oKDI1WzAtNV18KDJbMC00XXwxXFxkfFsxLTldfClcXGQpXFwuP1xcYil7NH0kIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI4NDE0Ny92YWxpZGF0aW5nLWlwdjQtYWRkcmVzc2VzLXdpdGgtcmVnZXhwXHJcbiAgY29uc3QgaXB2NEFkZHJlc3NSZWdleCA9XHJcbiAgICAvXigoMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KShcXC58JCkpezR9JC87XHJcbiAgcmV0dXJuIGlwdjRBZGRyZXNzUmVnZXgudGVzdChzdHIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGEgY29sb3IgaXMgdmFsaWQuXHJcbiAqIEBwYXJhbSBjb2xvciBUaGUgY29sb3Igc3RyaW5nIHRvIHRlc3QuXHJcbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGNvbG9yIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVDb2xvciA9IChjb2xvcjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgLy8gUmVtb3ZlIGFueSB3aGl0ZXNwYWNlIGZyb20gdGhlIGlucHV0XHJcbiAgY29uc3QgY2xlYW5lZENvbG9yID0gY29sb3IucmVwbGFjZSgvXFxzL2csICcnKTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgdGhlIGlucHV0IG1hdGNoZXMgYSB2YWxpZCBoZXggY29sb3IgcGF0dGVyblxyXG4gIGlmICgvXiM/WzAtOWEtZkEtRl17M30oWzAtOWEtZkEtRl17M30pPyQvLnRlc3QoY2xlYW5lZENvbG9yKSkge1xyXG4gICAgLy8gSWYgaXQgZG9lcywgYWRkIGEgJyMnIGlmIGl0J3MgbWlzc2luZyBhbmQgcmV0dXJuIHRoZSBjbGVhbmVkQ29sb3JcclxuICAgIHJldHVybiBjbGVhbmVkQ29sb3Iuc3RhcnRzV2l0aCgnIycpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGEgdXJsIGlzIHZhbGlkLlxyXG4gKiBAcGFyYW0gdXJsIFRoZSB1cmwgdG8gdGVzdC5cclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdXJsIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmFsaWRhdGVVcmwgPSAodXJsOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAvLyBDaGVjayBpZiB0aGUgdXJsIGlzIHZhbGlkXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsKTtcclxuICAgIHJldHVybiB1cmxPYmplY3QuaHJlZiA9PT0gdXJsOyAvLyBBZGRpdGlvbmFsIGNoZWNrIHRvIGhhbmRsZSByZWxhdGl2ZSBVUkxzXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRlc3RzIGlmIGEgcGF0aCBpcyB2YWxpZC5cclxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gdGVzdC5cclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcGF0aCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlUGF0aCA9IChwYXRoOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXRoUmVnZXggPSAvXlxcLyg/OlthLXpBLVowLTlfXStcXC8pP1thLXpBLVowLTlfXSokLztcclxuICByZXR1cm4gcGF0aFJlZ2V4LnRlc3QocGF0aCk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGVzdHMgaWYgYW4gaW1hZ2UgaXMgdmFsaWQuXHJcbiAqIEBwYXJhbSBpbWFnZSBUaGUgaW1hZ2UgdG8gdGVzdC5cclxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgaW1hZ2UgaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUltYWdlID0gKGltYWdlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAvLyBDaGVjayBpZiB0aGUgaW1hZ2UgaXMgdmFsaWRcclxuICB0cnkge1xyXG4gICAgY29uc3QgaW1hZ2VPYmplY3QgPSBuZXcgVVJMKGltYWdlKTtcclxuICAgIHJldHVybiBpbWFnZU9iamVjdC5ocmVmID09PSBpbWFnZTsgLy8gQWRkaXRpb25hbCBjaGVjayB0byBoYW5kbGUgcmVsYXRpdmUgVVJMc1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuIl19