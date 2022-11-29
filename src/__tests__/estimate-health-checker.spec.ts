import { EstimateHealthChecker } from '../estimate-health-checker';

describe('calcEstimateHealth()', () => {
  describe('using Fibonacci numbers, the maximum value is 34 and the maximum operating time is 80 hours', () => {
    const estimationValues = [0, 1, 2, 3, 5, 8, 13, 21, 34];
    const maxTime = 80;
    const healthChecker = new EstimateHealthChecker(estimationValues, maxTime);

    it('returns 0 if the estimate is appropriate', () => {
      expect(healthChecker.check(0, 0)).toEqual(0);
      expect(healthChecker.check(1, 2)).toEqual(0);
      expect(healthChecker.check(1, 3)).toEqual(0);
      expect(healthChecker.check(8, 16)).toEqual(0);
      expect(healthChecker.check(8, 24)).toEqual(0);
      expect(healthChecker.check(34, 65)).toEqual(0);
      expect(healthChecker.check(34, 80)).toEqual(0);
    });

    it('returns a value greater than 0 if the estimate is underestimated', () => {
      expect(healthChecker.check(1, 4)).toBeGreaterThan(0);
      expect(healthChecker.check(8, 25)).toBeGreaterThan(0);
      expect(healthChecker.check(34, 81)).toBeGreaterThan(0);
    });

    it('returns a value less than 0 if the estimate is overestimated', () => {
      expect(healthChecker.check(1, 1)).toBeLessThan(0);
      expect(healthChecker.check(8, 15)).toBeLessThan(0);
      expect(healthChecker.check(34, 64)).toBeLessThan(0);
    });
  });
});
