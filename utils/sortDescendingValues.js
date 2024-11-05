import { convertedDate } from "./convertDateType";

// Function to sort values in descending order based on their date property
export const sortDescendingValues = (values) =>
  values.sort((a, b) => {
    // Convert the date of the first value
    const dateA = convertedDate(a.date);
    // Convert the date of the second value
    const dateB = convertedDate(b.date);
    // Compare the two dates to sort in descending order
    return dateB - dateA;
  });
