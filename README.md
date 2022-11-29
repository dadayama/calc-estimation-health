# Estimate Health Checker

Tools to verify the accuracy of story point estimates.

## Requirement

- node >= 16.15.x

## Usage

```node
// List of available estimate values.
// Can be Fibonacci numbers or multiples.
const estimationValues = [0, 1, 2, 3, 5, 8, 13, 21, 34];
const healthChecker = new EstimateHealthChecker(estimationValues);

 // Returns 0 if the estimate is appropriate
const health1 = healthChecker.check(8, 16));

// Returns a value greater than 0 if the estimate is underestimated
const health2 = healthChecker.check(8, 25));

// Returns a value less than 0 if the estimate is overestimated
const health3 = healthChecker.check(8, 15));
```
