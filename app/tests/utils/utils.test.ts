import { CHANNEL_MAP } from '~/consts';
import { areNumbers, normalizeChannelName } from '~/utils/utils';

describe('normalizeChannelName', () => {
  it('should return normalized value if present in CHANNEL_MAP', () => {
    const key = Object.keys(CHANNEL_MAP)[0];
    const expected = CHANNEL_MAP[key];
    const result = normalizeChannelName(key.toUpperCase());
    expect(result).toBe(expected);
  });

  it('should return original value if not in CHANNEL_MAP', () => {
    const result = normalizeChannelName('unknownChannel');
    expect(result).toBe('unknownChannel');
  });

  it('should handle empty string', () => {
    const result = normalizeChannelName('');
    expect(result).toBe('');
  });
});

describe('areNumbers', () => {
  it('should return true if both values are numbers', () => {
    expect(areNumbers(1, 2)).toBe(true);
    expect(areNumbers(0, -5)).toBe(true);
    expect(areNumbers(1.5, 2.3)).toBe(true);
  });

  it('should return false if any value is not a number', () => {
    expect(areNumbers('1', 2)).toBe(false);
    expect(areNumbers(1, '2')).toBe(false);
    expect(areNumbers(null, 2)).toBe(false);
    expect(areNumbers(1, undefined)).toBe(false);
    expect(areNumbers({}, 2)).toBe(false);
    expect(areNumbers([], 2)).toBe(false);
  });

  it('should return false if both are non-numbers', () => {
    expect(areNumbers('a', 'b')).toBe(false);
    expect(areNumbers(null, undefined)).toBe(false);
    expect(areNumbers({}, [])).toBe(false);
  });
});
