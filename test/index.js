mocha.setup('bdd');

describe('GenCal', function(){
  describe('Month', function(){
    describe('initialized to January 1999', function(){
      var month = new GenCal.Month(1999, 0);
      describe('.weeks()', function(){
        var weeks = month.weeks();
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
    })
  })
})

window.onload = () => mocha.run();
