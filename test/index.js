mocha.setup('bdd');

describe('GenCal', function(){
  describe('Month', function(){
    describe('initialized to January 1999', function(){
      var month;
      beforeEach(function(){
        month = new GenCal.Month(1999, 0);
      })
      describe('.weeks()', function(){
        var weeks;
        beforeEach(function(){
          weeks = month.weeks();
        });
        it('should return an array of arrays of 7 dates', function(){
          assert(Array.isArray(weeks));
          weeks.forEach((week) => {
            assert.equal(week.length, 7);
            week.forEach((d) => assert(Date.prototype.isPrototypeOf(d)));
          })
        })
        it('should start each week with Sunday', function(){
          weeks.forEach((week) => {
            assert.equal(week[0].getDay(), 0);
          })
        })
        it('should start at Sunday, December 27 1998', function(){
          assert(weeks[0][0].getTime() == new Date(1998, 11, 27).getTime());
        })
        it('should end at Saturday, February 6 1999', function(){
          var lastWeek = weeks[weeks.length - 1];
          assert(lastWeek[6].getTime() == new Date(1999, 1, 6).getTime());
        })
        it('should contain January 1 in the first week', function(){
          var firstOfMonth = new Date(1999, 0, 1);
          assert(weeks[0].find((d) => d.getTime() == firstOfMonth.getTime()));
        })
        it('should contain January 31 in the last week', function(){
          var lastOfMonth = new Date(1999, 0, 31);
          var lastWeek = weeks[weeks.length - 1];
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
      describe('.prev()', function(){
        beforeEach(function(){
          month.prev();
        })
        it('should result in December 1998', function(){
          var weeks = month.weeks();
          var firstWeek = weeks[0];
          var firstOfMonth = new Date(1998, 11, 1);
          var lastWeek = weeks[weeks.length - 1];
          var lastOfMonth = new Date(1998, 11, 31);
          assert(firstWeek.find((d) => d.getTime() == firstOfMonth.getTime()));
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
      describe('.next()', function(){
        beforeEach(function(){
          month.next();
        })
        it('should result in February 1999', function(){
          var weeks = month.weeks();
          var firstWeek = weeks[0];
          var firstOfMonth = new Date(1999, 1, 1);
          var lastWeek = weeks[weeks.length - 1];
          var lastOfMonth = new Date(1999, 1, 28);
          assert(firstWeek.find((d) => d.getTime() == firstOfMonth.getTime()));
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
    })
    describe('initialized to May 2016', function(){
      var month;
      beforeEach(function(){
        month = new GenCal.Month(2016, 4);
      })
      describe('.weeks()', function(){
        var weeks;
        beforeEach(function(){
          weeks = month.weeks();
        });
        it('should return an array of arrays of 7 dates', function(){
          assert(Array.isArray(weeks));
          weeks.forEach((week) => {
            assert.equal(week.length, 7);
            week.forEach((d) => assert(Date.prototype.isPrototypeOf(d)));
          })
        })
        it('should start each week with Sunday', function(){
          weeks.forEach((week) => {
            assert.equal(week[0].getDay(), 0);
          })
        })
        it('should start at Sunday, May 1 2016', function(){
          assert(weeks[0][0].getTime() == new Date(2016, 4, 1).getTime());
        })
        it('should end at Saturday, Jun 4 2016', function(){
          var lastWeek = weeks[weeks.length - 1];
          assert(lastWeek[6].getTime() == new Date(2016, 5, 4).getTime());
        })
        it('should contain May 31 in the last week', function(){
          var lastOfMonth = new Date(2016, 4, 31);
          var lastWeek = weeks[weeks.length - 1];
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
      describe('.prev()', function(){
        beforeEach(function(){
          month.prev();
        })
        it('should result in April 2016', function(){
          var weeks = month.weeks();
          var firstWeek = weeks[0];
          var firstOfMonth = new Date(2016, 3, 1);
          var lastWeek = weeks[weeks.length - 1];
          var lastOfMonth = new Date(2016, 3, 30);
          assert(firstWeek.find((d) => d.getTime() == firstOfMonth.getTime()));
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
      describe('.next()', function(){
        beforeEach(function(){
          month.next();
        })
        it('should result in June 2016', function(){
          var weeks = month.weeks();
          var firstWeek = weeks[0];
          var firstOfMonth = new Date(2016, 5, 1);
          var lastWeek = weeks[weeks.length - 1];
          var lastOfMonth = new Date(2016, 5, 30);
          assert(firstWeek.find((d) => d.getTime() == firstOfMonth.getTime()));
          assert(lastWeek.find((d) => d.getTime() == lastOfMonth.getTime()));
        })
      })
    })
  })
  describe('Table', function(){
    var table;
    context('January 1999', function(){
      beforeEach(function(){
        var month = new GenCal.Month(1999, 0);
        table = new GenCal.Table(month, document.createElement('table'));
      })
      it('should contain 6 rows of 7 cells', function(){
        var rows = table.getElementsByTagName('tr');
        assert.equal(rows.length, 6);
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].getElementsByTagName('td');
          assert.equal(cells.length, 7);
        }
      })
      it('should have a number in every cell', function(){
        var cells = table.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
          assert(cells[i].innerText.match(/\d+/));
        }
      })
      it('should have a 1 in the first row', function(){
        var firstRow = table.getElementsByTagName('tr').item(0);
        var cells = Array.from(firstRow.getElementsByTagName('td'));
        assert(cells.find((td) => td.innerText == '1'));
      })
      it('should have a 31 in the last row', function(){
        var lastRow = table.getElementsByTagName('tr').item(5);
        var cells = Array.from(lastRow.getElementsByTagName('td'));
        assert(cells.find((td) => td.innerText == '31'));
      })
    })
  })
})

window.onload = () => mocha.run();
