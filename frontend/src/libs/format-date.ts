import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const formatDateNow = (dateString: Date | string) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: id });
};
