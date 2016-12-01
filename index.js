var GenCal = {
  MONTH_NAMES: 'January February March April May June July August September October November December'.split(' '),
  Month: (function(){
    function startOfWeek(d){
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
    }

    return function Month(y, m){
      var endOfMonth = new Date(y, m + 1, 1);
      var date = startOfWeek(new Date(y, m, 1));
      var weeks = [];
      while (date <= endOfMonth) {
        var week = [];
        while (week.length < 7) {
          week.push(date);
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    }
  })(),
  Table: (function(){
    return function Table(month, table){
      if (!table) table = document.createElement('table');
      while (table.firstChild) table.removeChild(table.firstChild);
      month.forEach((week) => {
        var tr = table.appendChild(document.createElement('tr'));
        week.forEach((day) => {
          tr.appendChild(document.createElement('td')).innerText = day.getDate();
        });
      });
      return table;
    }
  })()
};
