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
      return {
        year: y,
        month: m,
        weeks: weeks
      };
    }
  })(),
  Table: (function(){
    return function Table(month, table){
      if (!table) table = document.createElement('table');
      while (table.firstChild) table.removeChild(table.firstChild);
      month.weeks.forEach((week) => {
        var tr = table.appendChild(document.createElement('tr'));
        week.forEach((day) => {
          var td = document.createElement('td');
          td.dataset.gcDate = day.toISOString();
          td.innerText = day.getDate();
          tr.appendChild(td);
        });
      });
      return table;
    }
  })(),
  styleTable: function(month, table){
    for (td of table.getElementsByTagName('td')) {
      var date = new Date(td.dataset.gcDate);
      var classes = {
        'gc-current-month': () => date.getFullYear() == month.year && date.getMonth() == month.month,
        'gc-today': () => {
          var today = new Date();
          return today.toISOString().split('T')[0] == date.toISOString().split('T')[0];
        }
      }
      for (var klass in classes) if (classes[klass]()) td.classList.add(klass);
    }
  }
};
