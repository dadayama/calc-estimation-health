class Estimate {
  constructor(
    readonly value: number,
    private readonly timeEstimateRatio: number
  ) {}

  get time(): number {
    return this.value * this.timeEstimateRatio;
  }
}

class Estimates {
  constructor(
    private readonly estimationValues: Array<number>,
    private readonly maxTime: number
  ) {}

  get timeEstimateRatio(): number {
    return (
      this.maxTime / this.estimationValues[this.estimationValues.length - 1]
    );
  }

  createEstimate(value: number) {
    return new Estimate(value, this.timeEstimateRatio);
  }

  isMin(estimate: Estimate): boolean {
    const index = this.estimationValues.findIndex(
      (val) => val === estimate.value
    );
    return index === 0;
  }

  isMax(estimate: Estimate): boolean {
    const index = this.estimationValues.findIndex(
      (val) => val === estimate.value
    );
    return index === this.estimationValues.length - 1;
  }

  findOneSizeBelow(estimate: Estimate): Estimate {
    const estimateValue =
      this.estimationValues[
        this.estimationValues.findIndex((val) => val === estimate.value) - 1
      ];
    return new Estimate(estimateValue, this.timeEstimateRatio);
  }

  findOneSizeAbove(estimate: Estimate): Estimate {
    const estimateValue =
      this.estimationValues[
        this.estimationValues.findIndex((val) => val === estimate.value) + 1
      ];
    return new Estimate(estimateValue, this.timeEstimateRatio);
  }
}

export class EstimateHealthChecker {
  private readonly estimates: Estimates;

  constructor(estimateValues: Array<number>, private readonly maxTime: number) {
    this.estimates = new Estimates(estimateValues, this.maxTime);
  }

  private calcLowerTimeBound(estimate: Estimate): number {
    if (this.estimates.isMin(estimate)) return 0;

    const prevEstimate = this.estimates.findOneSizeBelow(estimate);
    return estimate.time - (estimate.time - prevEstimate.time) / 2;
  }

  private calcUpperTimeBound(estimate: Estimate): number {
    if (this.estimates.isMax(estimate)) return this.maxTime;

    const nextEstimate = this.estimates.findOneSizeAbove(estimate);
    return estimate.time + (nextEstimate.time - estimate.time) / 2;
  }

  check(estimateValue: number, actualTime: number) {
    const estimate = this.estimates.createEstimate(estimateValue);
    const lowerTimeBound = this.calcLowerTimeBound(estimate);
    const upperTimeBound = this.calcUpperTimeBound(estimate);

    if (upperTimeBound < actualTime) {
      // Returns a value greater than 0 if underestimated
      return actualTime - upperTimeBound;
    } else if (actualTime < lowerTimeBound) {
      // Returns a value less than 0 if overestimated
      return -(lowerTimeBound - actualTime);
    }

    // Returns 0 if appropriate
    return 0;
  }
}
