export const convertedDate = (param) => new Date(param.replace(/[/\-]/g, "-").split("-").reverse().join("-"));
