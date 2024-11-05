// Function to convert a date string to a Date object
export const convertedDate = (param) =>
  // Replace all '/' and '-' with '-' and split the string into an array
  new Date(
    param
      .replace(/[/\-]/g, "-")
      // Reverse the array elements and join them back into a string
      .split("-")
      .reverse()
      .join("-")
  );
