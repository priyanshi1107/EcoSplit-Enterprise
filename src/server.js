const express = require('express');
const path = require('path');
const { processCorporateExpense } = require('./app');

const server = express();
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

server.post('/api/split', async (req, res) => {
  try {
    const { userId, receipt } = req.body;
    const result = await processCorporateExpense(userId || 'priyanshi@company.com', receipt);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`EcoSplit-Enterprise UI running at http://localhost:${PORT}`));
