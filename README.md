EcoSplit-Enterprise/
│
├── src/
│   ├── config/             # Environment & credential configuration
│   ├── services/
│   │   ├── parserService.js   # LLM/Document processing logic
│   │   ├── workIqService.js   # Mock Microsoft Work IQ graph queries
│   │   └── settlementCore.js  # Strict mathematical ledger calculations
│   └── app.js              # Express app / Main orchestration controller
│
├── tests/                  # Math engine unit tests (Crucial for Reliability score!)
│   └── settlement.test.js
│
├── package.json
└── README.md
