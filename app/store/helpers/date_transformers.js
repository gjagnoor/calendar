export function toiso (date) {
  date = new Date(date);
  return date.toISOString();
}

export function datestring (date) {
  date = new Date(date);
  return date.toDateString();
}