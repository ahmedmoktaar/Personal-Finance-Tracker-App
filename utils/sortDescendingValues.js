import { convertedDate } from "./convertDateType";

export const sortDescendingValues = (values) =>
  values.sort((a, b) => {
    const dateA = convertedDate(a.date);
    const dateB = convertedDate(a.date);
    return dateB - dateA;
  });
