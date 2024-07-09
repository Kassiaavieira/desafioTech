import { TAX_RATES } from './constants';

export function calculateExpectedBalance(initialValue: number, monthlyInterestRate: number, investmentAgeInYears: number): number {
  const monthlyRate = 1 + monthlyInterestRate;
  const totalMonths = investmentAgeInYears * 12;
  return initialValue * Math.pow(monthlyRate, totalMonths);
}

export function calculateTotalTax(amountWithdrawn: number, investmentAgeInYears: number): number {
  let taxRate = 0;

  if (investmentAgeInYears < 1) {
    taxRate = TAX_RATES.lessThanOneYear;
  } else if (investmentAgeInYears >= 1 && investmentAgeInYears <= 2) {
    taxRate = TAX_RATES.oneToTwoYears;
  } else {
    taxRate = TAX_RATES.moreThanTwoYears;
  }

  return amountWithdrawn * taxRate;
}
