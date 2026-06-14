/**
 * Parser Service
 * Extracts structured data from raw receipt text/images.
 * In production, this would use Azure Document Intelligence or an LLM.
 */

function parseReceipt(rawInput) {
  // Simulates AI-powered receipt parsing
  // In production: Azure Form Recognizer / Document Intelligence API
  if (rawInput && rawInput.preProcessed) {
    return rawInput;
  }

  return {
    merchant: rawInput.merchant || "Unknown Merchant",
    timestamp: rawInput.timestamp || new Date().toISOString(),
    lineItems: rawInput.lineItems || [],
    totalAmount: rawInput.totalAmount || 0,
    currency: rawInput.currency || "USD"
  };
}

module.exports = { parseReceipt };
