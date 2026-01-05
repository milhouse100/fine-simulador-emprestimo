import { describe, it, expect } from 'vitest';
import {
  calculateLoan,
  formatCurrency,
  formatPercentage,
} from './loan-calculator';
import { LoanSimulationInput } from './types';

describe('Loan Calculator - PRICE Adaptado', () => {
  it('should calculate PRICE Adaptado correctly', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 1000,
      parcels: 2,
      rate: 50,
    };

    const result = calculateLoan(input);

    expect(result.totalValue).toBe(1500); // 1000 + 50%
    expect(result.totalInterest).toBe(500);
    expect(result.interestPercentage).toBe(50);
    expect(result.parcels).toHaveLength(2);
    expect(result.parcels[0].value).toBe(750); // (1000 + 500) / 2
  });

  it('should distribute interest equally across parcels', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 1000,
      parcels: 4,
      rate: 20,
    };

    const result = calculateLoan(input);

    // Each parcel should have equal interest
    const interestPerParcel = result.totalInterest / 4;
    result.parcels.forEach((parcel) => {
      expect(parcel.interest).toBeCloseTo(interestPerParcel, 2);
    });
  });
});

describe('Loan Calculator - Valor da Parcela', () => {
  it('should calculate fixed parcel correctly', () => {
    const input: LoanSimulationInput = {
      type: 'fixed-parcel',
      principal: 1000,
      parcels: 3,
      rate: 0, // Not used for this type
      fixedParcelValue: 500,
    };

    const result = calculateLoan(input);

    expect(result.totalValue).toBe(1500); // 500 * 3
    expect(result.totalInterest).toBe(500); // 1500 - 1000
    expect(result.parcels).toHaveLength(3);
    result.parcels.forEach((parcel) => {
      expect(parcel.value).toBe(500);
    });
  });

  it('should calculate interest percentage correctly', () => {
    const input: LoanSimulationInput = {
      type: 'fixed-parcel',
      principal: 1000,
      parcels: 2,
      rate: 0,
      fixedParcelValue: 600,
    };

    const result = calculateLoan(input);

    expect(result.totalValue).toBe(1200);
    expect(result.totalInterest).toBe(200);
    expect(result.interestPercentage).toBe(20); // (200 / 1000) * 100
  });

  it('should throw error if fixedParcelValue is missing', () => {
    const input: LoanSimulationInput = {
      type: 'fixed-parcel',
      principal: 1000,
      parcels: 3,
      rate: 0,
    };

    expect(() => calculateLoan(input)).toThrow();
  });
});

describe('Loan Calculator - Apenas Juros', () => {
  it('should calculate interest-only correctly', () => {
    const input: LoanSimulationInput = {
      type: 'interest-only',
      principal: 1000,
      parcels: 3,
      rate: 10,
    };

    const result = calculateLoan(input);

    // Monthly interest = 1000 * 10% = 100
    // Total interest = 100 * 3 = 300
    // Total value = 1000 + 300 = 1300
    expect(result.totalInterest).toBe(300);
    expect(result.totalValue).toBe(1300);
    expect(result.parcels).toHaveLength(4); // 3 interest parcels + 1 amortization

    // First 3 parcels should be interest only
    for (let i = 0; i < 3; i++) {
      expect(result.parcels[i].value).toBe(100);
      expect(result.parcels[i].interest).toBe(100);
      expect(result.parcels[i].principal).toBe(0);
      expect(result.parcels[i].balance).toBe(1000);
    }

    // Last parcel should be amortization
    expect(result.parcels[3].value).toBe(1000);
    expect(result.parcels[3].principal).toBe(1000);
    expect(result.parcels[3].balance).toBe(0);
  });

  it('should maintain balance during interest-only period', () => {
    const input: LoanSimulationInput = {
      type: 'interest-only',
      principal: 5000,
      parcels: 6,
      rate: 5,
    };

    const result = calculateLoan(input);

    // All interest parcels should maintain the same balance
    for (let i = 0; i < 6; i++) {
      expect(result.parcels[i].balance).toBe(5000);
    }
  });
});

describe('Loan Calculator - Juros Simples', () => {
  it('should calculate simple interest correctly', () => {
    const input: LoanSimulationInput = {
      type: 'simple-interest',
      principal: 1000,
      parcels: 3,
      rate: 5,
    };

    const result = calculateLoan(input);

    // Interest per parcel = 1000 * 5% = 50
    // Parcel value = (1000 / 3) + 50 = 383.33
    // Total interest = 50 * 3 = 150
    // Total value = 1000 + 150 = 1150
    expect(result.totalInterest).toBe(150);
    expect(result.totalValue).toBeCloseTo(1150, 2);
    expect(result.parcels).toHaveLength(3);

    result.parcels.forEach((parcel) => {
      expect(parcel.interest).toBeCloseTo(50, 2);
      expect(parcel.principal).toBeCloseTo(1000 / 3, 2);
      expect(parcel.value).toBeCloseTo(383.33, 2);
    });
  });

  it('should reduce balance correctly in simple interest', () => {
    const input: LoanSimulationInput = {
      type: 'simple-interest',
      principal: 1000,
      parcels: 4,
      rate: 10,
    };

    const result = calculateLoan(input);

    const principalPerParcel = 1000 / 4; // 250

    result.parcels.forEach((parcel, index) => {
      const expectedBalance = 1000 - principalPerParcel * (index + 1);
      expect(parcel.balance).toBeCloseTo(Math.max(0, expectedBalance), 2);
    });
  });
});

describe('Formatting Functions', () => {
  it('should format currency correctly', () => {
    const formatted1000 = formatCurrency(1000);
    expect(formatted1000).toContain('1.000');
    expect(formatted1000).toContain('00');
    
    const formatted1500 = formatCurrency(1500.5);
    expect(formatted1500).toContain('1.500');
    expect(formatted1500).toContain('50');
    
    const formatted0 = formatCurrency(0);
    expect(formatted0).toContain('0,00');
  });

  it('should format percentage correctly', () => {
    expect(formatPercentage(50)).toBe('50,00%');
    expect(formatPercentage(10)).toBe('10,00%');
    expect(formatPercentage(0)).toBe('0,00%');
  });
});

describe('Edge Cases', () => {
  it('should handle very small principal', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 0.01,
      parcels: 1,
      rate: 10,
    };

    const result = calculateLoan(input);
    expect(result.totalValue).toBeGreaterThan(0);
  });

  it('should handle maximum parcels', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 1000,
      parcels: 360,
      rate: 1,
    };

    const result = calculateLoan(input);
    expect(result.parcels).toHaveLength(360);
  });

  it('should handle zero interest rate', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 1000,
      parcels: 10,
      rate: 0,
    };

    const result = calculateLoan(input);
    expect(result.totalInterest).toBe(0);
    expect(result.totalValue).toBe(1000);
  });

  it('should handle high interest rate', () => {
    const input: LoanSimulationInput = {
      type: 'price',
      principal: 1000,
      parcels: 12,
      rate: 500,
    };

    const result = calculateLoan(input);
    expect(result.totalValue).toBe(6000); // 1000 * (1 + 5)
    expect(result.totalInterest).toBe(5000);
  });
});
