function generate_active_month_data (today) {
    // set date to first of the month
      today.setDate(1);
      
      // get the day and the dates 
      var [day, dates_arr] = [today.getDay(), [...Array(31).keys()]]; 
  
      for (var i = 0; i <= day - 2; i++) {
        dates_arr.unshift(0);
      }
  
      var [split_point, next_start_point, active_month] = [0, 0, []];
  
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