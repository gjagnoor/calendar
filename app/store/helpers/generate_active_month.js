function generate_active_month_data (calendar_date) {
      
      // set date to 1st of the month 
      var date = new Date(calendar_date);
      date.setDate(1);
      
      
      // get the day and the dates - eg. 5 and [1,2,3...31]
      var [day, dates_arr] = [date.getDay(), [...Array(31).keys()]];
      dates_arr = dates_arr.slice(1)

      // set first week - eg. add 0s from index 0 to index 5 
      for (var i = 0; i < day ; i++) {
        dates_arr.unshift(null);
      }
  
      var [split_point, next_start_point, active_month] = [0, 0, []];
      
      // set rest of the weeks
      for (var i = 0; i <= dates_arr.length-1; i++) {
        if (i % 7 === 0 && i !== 0) {
          split_point = i; // var imp for semantics
          var tmp_arr = dates_arr.slice(next_start_point, split_point);
          active_month.push(tmp_arr);
          next_start_point = i;
        }     
      }
      
      active_month.push(dates_arr.slice(next_start_point));      
      return active_month;
  }

  export default generate_active_month_data;