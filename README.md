# GenCal

*GenCal* is a javascript module that provides a monthly calendar and a DOM presentation of it.

## what it is
It is a monthly calendar model, and a minimal HTML view. It is tiny. It is dependency-free. It is modular and extendable.

## what it is not
It does not take an endless list of options. It does not include a reinvention of date inputs or dropdowns or popovers or bootstrap styles. It doesn't make the DOM needlessly complex. It doesn't add crappy inline styles to any elements. It doesn't care whether you're allowing the user to select a date or just showing a date or a range of dates or several nonconsecutive dates or how many calendars you want to display or when you want to display them.

## modules

### `GenCal.Month`

The core of *GenCal* is the model, an instance of `GenCal.Month`:

```js
var month = new GenCal.Month(1999, 0); // January 1999
```

It has methods for getting and setting properties, and emits events on changes.

### `GenCal.Table`

An instance of `GenCal.Table` takes a model and a table element, then subscribes to model updates and reflects them in the table:

```js
var el = document.createElement('table');
var table = new GenCal.Table(month, el);
```

### `GenCal.Header`

A common UI component of a monthly calendar is a header containing the name of the month and prev month/next month buttons. *GenCal* provides a simple implementation:

```js
var header = new GenCal.Header(month);
document.appendChild(header);
```
