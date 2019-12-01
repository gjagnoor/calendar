export function toiso (date) {
  date = new Date(date);
  return date.toISOString();
}

export function datestring (date) {
  // to eventually use something like...
  // var regex = RegExp('^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$');
  // console.log(regex.test(date));
  if (typeof(date) === 'string') {
    var incoming_date = new Date(date); // date string format 
    var corrected_date = incoming_date.setDate(incoming_date.getDate()+1); // number format
    return new Date(corrected_date).toDateString(); // date string format
  } else {
    return new Date(date).toDateString();
  }
}

Date.prototype.addDays = function (date, days) {
  date.setDate(date.getDate() + days)
  return date.toDateString();
}

export function next_7_days (date) {
  console.log(date);
  var new_date = new Date(date);
  var week = [];
  for (var i = 0; i <= 7; i++) {
    var next_date = new Date(new_date.getTime()); // to avoid mutating original new_date
    week.push(next_date.addDays(next_date, i));
  }
  return week;
}