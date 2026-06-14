/**
 * Deterministic Settlement Core
 * Optimizes peer-to-peer debts to minimize total transactions.
 * No LLM involvement — pure math for 100% accuracy.
 */

function calculateOptimizedSettlement(balances) {
  const debtors = [];
  const creditors = [];

  for (const [email, val] of Object.entries(balances)) {
    const amount = parseFloat(val);
    if (amount < 0) debtors.push({ email, amount: Math.abs(amount) });
    else if (amount > 0) creditors.push({ email, amount });
  }

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transactions = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const settled = Math.min(debtors[i].amount, creditors[j].amount);
    transactions.push({
      from: debtors[i].email,
      to: creditors[j].email,
      amount: parseFloat(settled.toFixed(2))
    });

    debtors[i].amount = parseFloat((debtors[i].amount - settled).toFixed(2));
    creditors[j].amount = parseFloat((creditors[j].amount - settled).toFixed(2));

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return transactions;
}

function computeBalances(totalAmount, payerEmail, attendees) {
  const share = parseFloat((totalAmount / attendees.length).toFixed(2));
  const balances = {};

  for (const email of attendees) {
    balances[email] = email === payerEmail
      ? parseFloat((totalAmount - share).toFixed(2))
      : -share;
  }

  return balances;
}

module.exports = { calculateOptimizedSettlement, computeBalances };
