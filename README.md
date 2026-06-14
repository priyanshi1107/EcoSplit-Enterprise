# EcoSplit-Enterprise

> Context-Aware Team Expense & Travel Settlement Agent for Microsoft 365 Copilot

An intelligent M365 Copilot agent that automatically parses corporate travel expenses, resolves shared team bills, and handles secure peer-to-peer settlements using **Work IQ**.

Built for the [Microsoft Agents League Hackathon 2026](https://microsoft.github.io/agents-league/) — Enterprise Agents Track.

---

## 🚀 Overview

Managing and splitting shared expenses after a team corporate trip or client dinner is a tedious manual headache. EcoSplit-Enterprise solves this by:

1. **Parsing** receipt images/PDFs into structured data
2. **Resolving** who was present via Microsoft Work IQ (calendar events, org graph)
3. **Calculating** optimized settlements using deterministic math (no LLM guesswork)
4. **Drafting** expense reports directly inside the M365 workspace

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    EcoSplit-Enterprise                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │  Receipt  │───>│ Parser       │───>│  Settlement      │  │
│  │  Upload   │    │ Service      │    │  Core (Math)     │  │
│  └──────────┘    └──────────────┘    └──────────────────┘  │
│                         │                      │            │
│                         ▼                      ▼            │
│                  ┌──────────────┐    ┌──────────────────┐   │
│                  │  Work IQ     │    │  M365 Copilot    │   │
│                  │  (Context)   │    │  Output Draft    │   │
│                  └──────────────┘    └──────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User uploads receipt
       │
       ▼
Parser Service (extracts line items, total, timestamp)
       │
       ▼
Work IQ Service (resolves team context from calendar/org graph)
       │
       ▼
Settlement Core (deterministic balance optimization)
       │
       ▼
Output: Optimized transaction plan + M365 expense draft
```

---

## 📂 Project Structure

```text
EcoSplit-Enterprise/
├── src/
│   ├── config/index.js        # Environment configuration
│   ├── services/
│   │   ├── parserService.js   # Receipt/document parsing
│   │   ├── workIqService.js   # Microsoft Work IQ integration
│   │   └── settlementCore.js  # Deterministic math engine
│   └── app.js                 # Main orchestration controller
├── tests/
│   └── settlement.test.js     # Unit tests for math engine
├── package.json
└── README.md
```

---

## 💡 Microsoft IQ Integration (Work IQ)

Instead of requiring manual group creation (like Splitwise), EcoSplit-Enterprise queries the **Work IQ intelligence layer** to:

- **Calendar Matching**: Finds calendar events matching the receipt timestamp to auto-detect attendees
- **Org Graph Resolution**: Understands team structures and reporting relationships
- **Permission Enforcement**: Respects M365 security boundaries — financial data never leaves the authorized perimeter

This eliminates manual data entry and ensures enterprise compliance by design.

---

## 🛡️ Reliability & Safety

| Concern | How We Handle It |
|---------|-----------------|
| Math Accuracy | All financial calculations run in isolated deterministic code — zero LLM involvement |
| Data Privacy | Work IQ enforces native M365 permission boundaries |
| Hallucination | Context is grounded entirely in enterprise data sources with citations |
| Prompt Injection | Strict input validation separates user content from system prompts |

---

## 🧠 Multi-Step Reasoning Flow

1. **Ingest** — Raw receipt → structured JSON (line items, totals, timestamp)
2. **Contextualize** — Timestamp + user ID → Work IQ query → team attendees
3. **Calculate** — Greedy settlement algorithm minimizes transaction count
4. **Output** — Formatted expense report draft for M365 Copilot

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the demo pipeline
npm start

# Run tests
npm test
```

### Sample Output

```json
{
  "meta": {
    "expenseReason": "Architecture Strategy Offsite Dinner",
    "securityBoundary": "Internal-Enterprise-Only"
  },
  "settlementPlan": [
    { "from": "aayush@company.com", "to": "priyanshi@company.com", "amount": 50 },
    { "from": "manager@company.com", "to": "priyanshi@company.com", "amount": 50 }
  ]
}
```

---

## 🔧 Tech Stack

- **Runtime**: Node.js
- **IQ Layer**: Microsoft Work IQ (M365 Graph context)
- **Testing**: Jest
- **Target Platform**: Microsoft 365 Copilot Agent

---

## 📋 Hackathon Details

- **Track**: Enterprise Agents
- **IQ Integration**: Work IQ
- **Team**: Priyanshi Soni

---

## 📄 License

MIT
