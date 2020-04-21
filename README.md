# relative-from-now
A utility helper to calculate the timeAgo or formNow in a readable format using Intl API


```javascript
// 1. the problem
// return a human readable relative time

// inputs: date object(19-07-10T12:24:01Z), lang string
// outputs: human readable string associated with language


// 2. Explore concrete examples

// fromNow(date, 'en') => '1 day ago'
// fromNow(date, 'fa') => ‫'۱ روز پیش'
// fromNow(invalid, lang) => ‫''
// fromNow(date, default? (from body)) => ‫'1 day ago'

// order does matter
const units = [
  ['minute', 60],
  ['hour', 60 * 60],
  ['day', 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['year', 12 * 30 * 24 * 60 * 60],
];

function diffUnitFor(from) {
  // 3. Break it down
  // select and return a proper units base on time diff

  // diffUnitFor('2019-07-10T12:24:01Z') => { delta: 1, unit: year}
  // diffUnitFor('2020-04-19T12:24:01Z') => { delta: 2, unit: day}


  // ignore difficulties: negative values, round the number

  const delta = Math.round((new Date(from) - Date.now()) / 1000); // rounded diff in seconds

  // loop over units
  // return the one that is greater than diff

  for (const [unit, value] of units) {
    if (Math.abs(delta) < value) {
      // break the loop once a unit will be find
      return { unit, delta: Math.floor(delta / value) };
    }
  }

  // default return;
  const year = units[units.length - 1];
  return {
    delta: Math.floor(delta / year[1]),
    unit: 'year'
  };
}

function fromNow(date, lang = 'en') {
  const rtf1 = new Intl.RelativeTimeFormat(lang, { style: 'long' });

  // check date validity
  if (!date) {
    return '';
  }

  // calc time diff
  // const diff = new Date(date) - new Date();
  const { delta, unit } = diffUnitFor(date);

  // return formatted time
  return rtf1.format(delta, unit);
}


console.log(
  fromNow('2017-07-10T12:24:01Z') // 3 years ago
);


```
