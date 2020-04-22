import fromNow from '@/shared/utils/fromNow';

describe('utils/fromNow', () => {
  beforeAll(() => {
    /* eslint-disable global-require */
    const RelativeTimeFormat = require('relative-time-format').default;

    RelativeTimeFormat
      .addLocale(require('relative-time-format/locale/en.json'));

    RelativeTimeFormat
      .addLocale(require('relative-time-format/locale/fa.json'));

    global.Intl.RelativeTimeFormat = RelativeTimeFormat;
  });

  describe('#fromNow', () => {
    it('should return time ago for given time string', () => {
      expect(fromNow('2017-07-10T12:24:01Z')).toBe('3 years ago');
    });

    it('should return time ago for given time string and lang', () => {
      expect(fromNow('2017-07-10T12:24:01Z', 'fa')).toBe('3 سال پیش');
    });

    it('should return empty string if date is not porvided', () => {
      expect(fromNow('')).toBe('');
    });
  });
});
