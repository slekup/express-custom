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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdmFsaWRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLENBQUMsVUFBa0IsRUFBVyxFQUFFO0lBQ3BFLE1BQU0sbUJBQW1CLEdBQ3ZCLDhKQUE4SixDQUFDO0lBQ2pLLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLElBQVksRUFBaUIsRUFBRTtJQUNsRSxNQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQyxDQUFDLDhDQUE4QztJQUUvRiw2Q0FBNkM7SUFDN0MsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLHdDQUF3QztRQUVsRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTztZQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMscUNBQXFDO1FBRTFFLHlDQUF5QztRQUN6QyxNQUFNLFNBQVMsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsd0NBQXdDO1FBQzNHLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO1FBRXZFLE9BQU8sR0FBRyxXQUFXLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQyw4QkFBOEI7S0FDM0U7SUFFRCxPQUFPLElBQUks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YSxHQUFHLENBQUMsS0FBYSxFQUFXLEVBQUU7SUFDdEQsOEJBQThCO0lBQzlCLElBQUk7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxPQUFPLFdBQVcsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsMkNBQTJDO0tBQy9FO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWYWxpZGF0ZSBhIGNyb24gZXhwcmVzc2lvbi5cbiAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBjcm9uIGV4cHJlc3Npb24gdG8gdmFsaWRhdGUuXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBjcm9uIGV4cHJlc3Npb24gaXMgdmFsaWQuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNyb25FeHByZXNzaW9uID0gKGV4cHJlc3Npb246IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBjcm9uRXhwcmVzc2lvblJlZ2V4ID1cbiAgICAvXihcXCp8WzAtOV17MSwyfXxcXCpcXC9bMC05XXsxLDJ9KSAoXFwqfFswLTldezEsMn18XFwqXFwvWzAtOV17MSwyfSkgKFxcKnxbMC05XXsxLDJ9fFxcKlxcL1swLTldezEsMn0pIChcXCp8WzAtOV17MSwyfXxcXCpcXC9bMC05XXsxLDJ9KSAoXFwqfFswLTldezEsMn18XFwqXFwvWzAtOV17MSwyfSkkLztcbiAgcmV0dXJuIGNyb25FeHByZXNzaW9uUmVnZXgudGVzdChleHByZXNzaW9uKTtcbn07XG5cbi8qKlxuICogQ29udmVydCBhIHRpbWUgdG8gY3JvbiB0aW1lLlxuICogQHBhcmFtIHRpbWUgVGhlIHRpbWUgdG8gY29udmVydCB0byBjcm9uIHRpbWUuXG4gKiBAcmV0dXJucyBUaGUgY29udmVydGVkIHRpbWUuXG4gKi9cbmV4cG9ydCBjb25zdCB0aW1lVG9Dcm9uRXhwcmVzc2lvbiA9ICh0aW1lOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsID0+IHtcbiAgY29uc3QgdGltZVJlZ2V4ID0gL14oWzAxXVxcZHwyWzAtM10pOihbMC01XVxcZCkkLzsgLy8gUmVndWxhciBleHByZXNzaW9uIHRvIHZhbGlkYXRlIEhIOk1NIGZvcm1hdFxuXG4gIC8vIENoZWNrIGlmIHRoZSB0aW1lIG1hdGNoZXMgdGhlIEhIOk1NIGZvcm1hdFxuICBpZiAodGltZVJlZ2V4LnRlc3QodGltZSkpIHtcbiAgICBjb25zdCBbaG91cnMsIG1pbnV0ZXNdID0gdGltZS5zcGxpdCgnOicpOyAvLyBTcGxpdCB0aGUgdGltZSBpbnRvIGhvdXJzIGFuZCBtaW51dGVzXG5cbiAgICBpZiAoIWhvdXJzIHx8ICFtaW51dGVzKSByZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgdGhlIHRpbWUgaXMgaW52YWxpZFxuXG4gICAgLy8gRm9ybWF0IGhvdXJzIGFuZCBtaW51dGVzIGZvciBjcm9uIHRpbWVcbiAgICBjb25zdCBjcm9uSG91cnMgPSBob3VycyA9PT0gJzAwJyA/ICcwJyA6IGhvdXJzLnJlcGxhY2UoL14wKy8sICcnKTsgLy8gUmVtb3ZlIGxlYWRpbmcgemVyb3MsIGV4Y2VwdCBmb3IgJzAwJ1xuICAgIGNvbnN0IGNyb25NaW51dGVzID0gbWludXRlcy5yZXBsYWNlKC9eMCsvLCAnJyk7IC8vIFJlbW92ZSBsZWFkaW5nIHplcm9zXG5cbiAgICByZXR1cm4gYCR7Y3Jvbk1pbnV0ZXN9ICR7Y3JvbkhvdXJzfSAqICogKmA7IC8vIFJldHVybiB0aGUgY3JvbiB0aW1lIGZvcm1hdFxuICB9XG5cbiAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRoZSB0aW1lIGlzIGludmFsaWRcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgYSB0aW1lLlxuICogQHBhcmFtIHRpbWUgVGhlIHRpbWUgdG8gdmFsaWRhdGUuXG4gKiBAcmV0dXJucyBXaGV0aGVyIHRoZSB0aW1lIGlzIHZhbGlkLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVUaW1lID0gKHRpbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB0aW1lUmVnZXggPSAvXig/OlswMV1cXGR8MlswLTNdKTooPzowMHwzMCkkLzsgLy8gUmVndWxhciBleHByZXNzaW9uIHRvIHZhbGlkYXRlIEhIOk1NIGZvcm1hdFxuICByZXR1cm4gdGltZVJlZ2V4LnRlc3QodGltZSk7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgc3RyaW5nIGlzIGVtcHR5LlxuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBzdHJpbmcgaXMgZW1wdHksIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlRW1haWwgPSAoc3RyOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgLy8gL15cXFMrQFxcUytcXC5cXFMrJC9cbiAgLy8gL1xcUytAXFxTK1xcLlxcUysvXG4gIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcbiAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChzdHIpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHVzZXJuYW1lIGlzIHZhbGlkLlxuICogQHBhcmFtIHN0ciBUaGUgdXNlcm5hbWUgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIHVzZXJuYW1lIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVVzZXJuYW1lID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHVzZXJuYW1lUmVnZXggPSAvXlthLXpBLVowLTlfXXszLDE2fSQvO1xuICByZXR1cm4gdXNlcm5hbWVSZWdleC50ZXN0KHN0cik7XG59O1xuXG4vKipcbiAqIFRlc3RzIGlmIGEgcGFzc3dvcmQgaXMgdmFsaWQuXG4gKiBAcGFyYW0gc3RyIFRoZSBwYXNzd29yZCB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcGFzc3dvcmQgaXMgdmFsaWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuZXhwb3J0IGNvbnN0IHZhbGllZGF0ZVBhc3N3b3JkID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhc3N3b3JkUmVnZXggPSAvXig/PS4qW2Etel0pKD89LipbQS1aXSkoPz0uKlxcZClbYS16QS1aXFxkXXs4LH0kLztcbiAgcmV0dXJuIHBhc3N3b3JkUmVnZXgudGVzdChzdHIpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHBob25lIG51bWJlciBpcyB2YWxpZC5cbiAqIEBwYXJhbSBzdHIgVGhlIHBob25lIG51bWJlciB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcGhvbmUgbnVtYmVyIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVBob25lTnVtYmVyID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBob25lTnVtYmVyUmVnZXggPSAvXlxcZHsxMH0kLztcbiAgcmV0dXJuIHBob25lTnVtYmVyUmVnZXgudGVzdChzdHIpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIGlwdjQgYWRkcmVzcyBpcyB2YWxpZC5cbiAqIEBwYXJhbSBzdHIgVGhlIElQdjQgYWRkcmVzcyB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgSVB2NCBhZGRyZXNzIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUlwdjRBZGRyZXNzID0gKHN0cjogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIC8vIF4oKDI1WzAtNV18KDJbMC00XXwxXFxkfFsxLTldfClcXGQpXFwuP1xcYil7NH0kIC0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTI4NDE0Ny92YWxpZGF0aW5nLWlwdjQtYWRkcmVzc2VzLXdpdGgtcmVnZXhwXG4gIGNvbnN0IGlwdjRBZGRyZXNzUmVnZXggPVxuICAgIC9eKCgyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pKFxcLnwkKSl7NH0kLztcbiAgcmV0dXJuIGlwdjRBZGRyZXNzUmVnZXgudGVzdChzdHIpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIGNvbG9yIGlzIHZhbGlkLlxuICogQHBhcmFtIGNvbG9yIFRoZSBjb2xvciBzdHJpbmcgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGNvbG9yIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUNvbG9yID0gKGNvbG9yOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgLy8gUmVtb3ZlIGFueSB3aGl0ZXNwYWNlIGZyb20gdGhlIGlucHV0XG4gIGNvbnN0IGNsZWFuZWRDb2xvciA9IGNvbG9yLnJlcGxhY2UoL1xccy9nLCAnJyk7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlIGlucHV0IG1hdGNoZXMgYSB2YWxpZCBoZXggY29sb3IgcGF0dGVyblxuICBpZiAoL14jP1swLTlhLWZBLUZdezN9KFswLTlhLWZBLUZdezN9KT8kLy50ZXN0KGNsZWFuZWRDb2xvcikpIHtcbiAgICAvLyBJZiBpdCBkb2VzLCBhZGQgYSAnIycgaWYgaXQncyBtaXNzaW5nIGFuZCByZXR1cm4gdGhlIGNsZWFuZWRDb2xvclxuICAgIHJldHVybiBjbGVhbmVkQ29sb3Iuc3RhcnRzV2l0aCgnIycpO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHVybCBpcyB2YWxpZC5cbiAqIEBwYXJhbSB1cmwgVGhlIHVybCB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgdXJsIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVVybCA9ICh1cmw6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAvLyBDaGVjayBpZiB0aGUgdXJsIGlzIHZhbGlkXG4gIHRyeSB7XG4gICAgY29uc3QgdXJsT2JqZWN0ID0gbmV3IFVSTCh1cmwpO1xuICAgIHJldHVybiB1cmxPYmplY3QuaHJlZiA9PT0gdXJsOyAvLyBBZGRpdGlvbmFsIGNoZWNrIHRvIGhhbmRsZSByZWxhdGl2ZSBVUkxzXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhIHBhdGggaXMgdmFsaWQuXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCB0byB0ZXN0LlxuICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgcGF0aCBpcyB2YWxpZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGVQYXRoID0gKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXRoUmVnZXggPSAvXlxcLyg/OlthLXpBLVowLTlfXStcXC8pP1thLXpBLVowLTlfXSokLztcbiAgcmV0dXJuIHBhdGhSZWdleC50ZXN0KHBhdGgpO1xufTtcblxuLyoqXG4gKiBUZXN0cyBpZiBhbiBpbWFnZSBpcyB2YWxpZC5cbiAqIEBwYXJhbSBpbWFnZSBUaGUgaW1hZ2UgdG8gdGVzdC5cbiAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGltYWdlIGlzIHZhbGlkLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUltYWdlID0gKGltYWdlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgLy8gQ2hlY2sgaWYgdGhlIGltYWdlIGlzIHZhbGlkXG4gIHRyeSB7XG4gICAgY29uc3QgaW1hZ2VPYmplY3QgPSBuZXcgVVJMKGltYWdlKTtcbiAgICByZXR1cm4gaW1hZ2VPYmplY3QuaHJlZiA9PT0gaW1hZ2U7IC8vIEFkZGl0aW9uYWwgY2hlY2sgdG8gaGFuZGxlIHJlbGF0aXZlIFVSTHNcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIl19