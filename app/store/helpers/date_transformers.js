export function toiso (date) {
  date = new Date(date);
  return date.toISOString();
}

export function datestring (date) {
  date = new Date(date);
  return date.toDateString();
}

Date.prototype.addDays = function (date, days) {
  date.setDate(date.getDate() + days)
  return date.toDateString();
}

export function next_7_days (date) {
  var new_date = new Date(date);
  var week = [];
  for (var i = 0; i <= 6; i++) {
    var next_date = new Date(new_date.getTime()); // to avoid mutating original new_date
    week.push(next_date.addDays(next_date, i));
  }
  return week;
}