const workIqService = require('./services/workIqService');
const { calculateOptimizedSettlement, computeBalances } = require('./services/settlementCore');
const { parseReceipt } = require('./services/parserService');
const config = require('./config');

async function processCorporateExpense(userId, rawReceipt) {
  console.log("\n=== EcoSplit-Enterprise Processing Pipeline ===\n");

  // Step 1: Parse receipt
  const receipt = parseReceipt(rawReceipt);
  console.log(`[Parser] Merchant: ${receipt.merchant} | Total: $${receipt.totalAmount}`);

  // Step 2: Resolve team context via Work IQ
  const context = await workIqService.resolveTeamContext(userId, receipt.timestamp);
  console.log(`[Work IQ] Event: "${context.meetingSubject}" | Attendees: ${context.detectedAttendees.length} | Confidence: ${context.confidenceScore}`);

  // Step 3: Compute balances (deterministic — no LLM)
  const balances = computeBalances(receipt.totalAmount, userId, context.detectedAttendees);
  console.log(`[Settlement] Balance matrix:`, balances);

  // Step 4: Optimize transactions
  const transactions = calculateOptimizedSettlement(balances);

  const result = {
    meta: {
      merchant: receipt.merchant,
      expenseReason: context.meetingSubject,
      totalAmount: receipt.totalAmount,
      currency: receipt.currency,
      securityBoundary: context.dataBoundary
    },
    settlementPlan: transactions
  };

  console.log(`\n[Output] Settlement plan generated with ${transactions.length} transaction(s)\n`);
  return result;
}

// Demo execution
if (require.main === module) {
  const mockReceipt = {
    merchant: "Bistro Central",
    timestamp: "2026-06-14T20:00:00Z",
    totalAmount: 150.00,
    currency: "USD",
    lineItems: [
      { item: "Pasta", price: 45 },
      { item: "Steak", price: 55 },
      { item: "Drinks", price: 30 },
      { item: "Tax & Tip", price: 20 }
    ]
  };

  processCorporateExpense("priyanshi@company.com", mockReceipt).then(output => {
    console.log(JSON.stringify(output, null, 2));
  });
}

module.exports = { processCorporateExpense };
