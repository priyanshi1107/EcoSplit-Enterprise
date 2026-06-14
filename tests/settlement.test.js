const { calculateOptimizedSettlement, computeBalances } = require('../src/services/settlementCore');

describe('Settlement Core', () => {
  describe('computeBalances', () => {
    test('splits evenly among 3 attendees', () => {
      const balances = computeBalances(150, 'payer@co.com', ['payer@co.com', 'b@co.com', 'c@co.com']);
      expect(balances['payer@co.com']).toBe(100);
      expect(balances['b@co.com']).toBe(-50);
      expect(balances['c@co.com']).toBe(-50);
    });

    test('single person means no debt', () => {
      const balances = computeBalances(100, 'solo@co.com', ['solo@co.com']);
      expect(balances['solo@co.com']).toBe(0);
    });
  });

  describe('calculateOptimizedSettlement', () => {
    test('resolves simple 3-person split', () => {
      const balances = { 'a@co.com': 100, 'b@co.com': -50, 'c@co.com': -50 };
      const txns = calculateOptimizedSettlement(balances);
      expect(txns).toHaveLength(2);
      expect(txns[0].to).toBe('a@co.com');
      expect(txns[0].amount + txns[1].amount).toBe(100);
    });

    test('handles already settled (all zero)', () => {
      const balances = { 'a@co.com': 0, 'b@co.com': 0 };
      const txns = calculateOptimizedSettlement(balances);
      expect(txns).toHaveLength(0);
    });

    test('minimizes transaction count for complex case', () => {
      const balances = { 'a@co.com': 80, 'b@co.com': -30, 'c@co.com': -20, 'd@co.com': -30 };
      const txns = calculateOptimizedSettlement(balances);
      // All money flows to a@co.com
      const totalSettled = txns.reduce((sum, t) => sum + t.amount, 0);
      expect(totalSettled).toBe(80);
      expect(txns.length).toBeLessThanOrEqual(3);
    });

    test('handles fractional amounts correctly', () => {
      const balances = { 'a@co.com': 33.33, 'b@co.com': -16.67, 'c@co.com': -16.66 };
      const txns = calculateOptimizedSettlement(balances);
      txns.forEach(t => {
        expect(Number.isFinite(t.amount)).toBe(true);
        expect(t.amount.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
      });
    });
  });
});
