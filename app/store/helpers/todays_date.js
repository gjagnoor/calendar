function todays_date () {
  var date_today = new Date();
  date_today = date_today.toISOString().split('T')[0];

  return date_today;
}

export default todays_date;