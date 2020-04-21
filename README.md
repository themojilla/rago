# relative-from-now
A utility helper to calculate the timeAgo or formNow in a readable format using Intl API


```javascript

// Order does matter
const units = [
  ['minute', 60],
  ['hour', 60 * 60],
  ['day', 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['year', 12 * 30 * 24 * 60 * 60],
];

export function diffUnitFor(from) {
  const delta = Math.round((from - Date.now()) / 1000); // Rounded delta in seconds

  for (let i = 0; i < units.length; i += 1) {
    if (Math.abs(delta) < units[i][1]) {
      const [unit, value] = units[i - 1];

      // Exit the function once a unit will be found
      return { unit, delta: Math.round(delta / value) };
    }
  }

  return {
    delta: Math.round(delta / (12 * 30 * 24 * 60 * 60)),
    unit: 'year'
  };
}

/**
 * Calculate "time ago" or "from now" in a readable format using Intl API
 *
 * @param {Date|String} date
 * @param {String} lang
 * @returns {String}
 */
export default function fromNow(date, lang = 'en') {
  let from = date;

  if (!date) {
    return '';
  }

  if (!(date instanceof Date)) {
    from = new Date(date);
  }

  const rtf1 = new Intl.RelativeTimeFormat(lang, { style: 'long' });
  const { delta, unit } = diffUnitFor(from);

  return rtf1.format(delta, unit);
}

// usage
fromNow("2019-04-21T11:34:41.773Z");
fromNow('2020-04-21T12:24:01Z', 'fa');

```
