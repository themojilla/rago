import fromNow from './fromNow';

const originalNowUtil = Date.now;

describe('utils/fromNow', () => {
  beforeAll(() => {
    /* eslint-disable global-require */
    const RelativeTimeFormat = require('relative-time-format').default;

    RelativeTimeFormat
      .addLocale(require('relative-time-format/locale/en.json'));

    RelativeTimeFormat
      .addLocale(require('relative-time-format/locale/fa.json'));

    global.Intl.RelativeTimeFormat = RelativeTimeFormat;
    
    global.Date.now = jest
      .fn(() => new Date('2020-04-20T10:20:30Z').getTime());
  });

  afterAll(() => {
    global.Date.now = originalNowUtil;
  });

  describe('#fromNow', () => {
    it('should return time ago for given time string', () => {
      expect(fromNow('2017-07-10T12:24:01Z')).toBe('3 years ago');
      expect(fromNow('2020-04-20T10:20:00Z')).toBe('30 seconds ago');
      expect(fromNow('2020-03-20T10:20:00Z')).toBe('1 month ago');
      expect(fromNow('2020-04-20T10:19:00Z')).toBe('1 minute ago');
      expect(fromNow('2020-04-19T10:19:00Z')).toBe('1 day ago');
      expect(fromNow('2020-04-20T10:15:00Z')).toBe('5 minutes ago');
    });

    it('should return time ago for given time string and lang', () => {
            expect(fromNow('2017-07-10T12:24:01Z', 'fa')).toBe('3 سال پیش');
            expect(fromNow('2020-04-20T10:15:00Z', 'fa')).toBe('5 دقیقه پیش');
    });

    it('should return empty string if date is not provided', () => {
      expect(fromNow('')).toBe('');
    });

    it('should return empty string if date is invalid', () => {
      expect(fromNow('dummy input')).toBe('');
    });
  });
});
