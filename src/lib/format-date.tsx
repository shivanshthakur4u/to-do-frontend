import { format } from "date-fns";


export const formatDate = (date: Date | undefined) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

export const formatToTwelveHrs = (date: any) => {
  return date ? format(date, "p") : "";
};
