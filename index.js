function EventEmitter(){
  this._listeners = {};
}

EventEmitter.prototype.on = function(event, listener){
  if (!this._listeners[event]) this._listeners[event] = [];
  this._listeners[event].push(listener);
  return this;
}

EventEmitter.prototype.emit = function(event){
  var args = Array.prototype.slice.apply(arguments, [1]);
  var listeners = this._listeners[event];
  if (listeners) listeners.forEach((cb) => cb.apply(this, args));
  return this;
}

var GenCal = {
  MONTH_NAMES: 'January February March April May June July August September October November December'.split(' '),
  Month: (function(){
    function Month(y, m){
      EventEmitter.call(this);
      this.year = y;
      this.month = m;
    }

    Object.assign(Month.prototype, EventEmitter.prototype);

    function startOfWeek(d){
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - d.getDay());
    }

    Month.prototype.weeks = function(){
      var startOfMonth = new Date(this.year, this.month, 1);
      var startOfNextMonth = new Date(this.year, this.month + 1, 1);
      var date = startOfWeek(startOfMonth);
      var weeks = [];
      while (date < startOfNextMonth) {
        var week = [];
        while (week.length < 7) {
          week.push(date);
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    };

    Month.prototype.next = function(){
      this.month = ((this.month + 1) % 12);
      if (this.month == 0) this.year += 1;
      this.emit('change');
    }

    Month.prototype.prev = function(){
      this.month = ((this.month + 11) % 12);
      if (this.month == 11) this.year -= 1;
      this.emit('change');
    }

    return Month;
  })(),
  Table: (function(){
    function styleTable(month, table){
      for (td of table.getElementsByTagName('td')) {
        var date = new Date(td.dataset.gcDate);
        var classes = {
          'gc-current-month': () => {
            return date.getFullYear() == month.year &&
              date.getMonth() == month.month;
          },
          'gc-today': () => {
            var today = new Date();
            return today.toISOString().split('T')[0] == date.toISOString().split('T')[0];
          }
        }
        for (var klass in classes) if (classes[klass]()) td.classList.add(klass);
      }
    }

    function populateTable(month, table){
      while (table.firstChild) table.removeChild(table.firstChild);
      month.weeks().forEach((week) => {
        var tr = table.appendChild(document.createElement('tr'));
        week.forEach((day) => {
          var td = document.createElement('td');
          td.dataset.gcDate = day.toISOString();
          td.innerText = day.getDate();
          tr.appendChild(td);
        });
      });
      styleTable(month, table);
    }

    return function Table(month, table){
      if (!table) table = document.createElement('table');
      populateTable(month, table);
      month.on('change', () => populateTable(month, table));
      return table;
    }
  })(),
  Header: (function(){
    return function Header(month){
      var header = document.createElement('div');
      header.classList.add('gc-header');

      var monthName = document.createElement('span');
      header.appendChild(monthName);
      function populateMonthNameSpan(){
        monthName.innerText = GenCal.MONTH_NAMES[month.month] + ' ' + month.year;
      }
      populateMonthNameSpan();
      month.on('change', populateMonthNameSpan);

      var prev = document.createElement('button');
      prev.type = 'button';
      prev.classList.add('link', 'left');
      prev.innerHTML = '&larr;';
      prev.addEventListener('click', () => month.prev(), false);
      header.appendChild(prev);

      var next = document.createElement('button');
      next.type = 'button';
      next.classList.add('link', 'right');
      next.innerHTML = '&rarr;'
      next.addEventListener('click', () => month.next(), false);
      header.appendChild(next);

      return header;
    };
  })()
};
