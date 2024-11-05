export const sortDescendingValues = (values) =>
  values.sort((a, b) => {
    const dateA = new Date(a.date.replace(/[/\-]/g, "-").split("-").reverse().join("-"));
    const dateB = new Date(b.date.replace(/[/\-]/g, "-").split("-").reverse().join("-"));
    return dateB - dateA;
  });
