export function toiso (date) {
  date = new Date(date);
  return date.toISOString();
}

export function datestring (date) {
  date = new Date(date);
  return date.toDateString();
}

export function next_7_days (date) {
  Date.prototype.addDays = function (date, days) {
    date.setDate(date.getDate() + days)
    return date.toDateString();
  }

  var new_date = new Date(date);

  var week = [];

  for (var i = 0; i <= 6; i++) {
    week.push(new_date.addDays(new_date, i+1));
  }

  return week;
}