import { LENGTH_TO_TRIM } from "../consts/consts";

export const getTruncatedText = (text: string): string => {
  return text.length > LENGTH_TO_TRIM ? `${text.slice(0, LENGTH_TO_TRIM)}...` : text;
};
