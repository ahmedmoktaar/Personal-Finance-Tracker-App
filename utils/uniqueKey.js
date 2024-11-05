// Function to generate a unique key based on input values and current timestamp
export const generateUniqueKey = (values) => {
  // Get the current timestamp in milliseconds
  const timestamp = new Date().getTime();
  // Return a unique key string combining a prefix, the date from values, and the timestamp
  return `@form_data_${values.date}_${timestamp}`;
};
