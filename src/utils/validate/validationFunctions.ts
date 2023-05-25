const cronExpressionRegex =
  /^(\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2}) (\*|[0-9]{1,2}|\*\/[0-9]{1,2})$/;

/**
 * Validate a cron expression.
 * @param expression The cron expression to validate.
 * @returns Whether the cron expression is valid.
 */
export const validateCronExpression = (expression: string): boolean =>
  cronExpressionRegex.test(expression);

/**
 * Convert a time to cron time.
 * @param time The time to convert to cron time.
 * @returns The converted time.
 */
export const timeToCronExpression = (time: string): string | null => {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Regular expression to validate HH:MM format

  // Check if the time matches the HH:MM format
  if (timeRegex.test(time)) {
    const [hours, minutes] = time.split(':'); // Split the time into hours and minutes

    if (!hours || !minutes) return null; // Return null if the time is invalid

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
export const validateTime = (time: string): boolean => {
  const timeRegex = /^(?:[01]\d|2[0-3]):(?:00|30)$/; // Regular expression to validate HH:MM format
  return timeRegex.test(time);
};
