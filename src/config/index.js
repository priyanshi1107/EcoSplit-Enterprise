module.exports = {
  workIq: {
    tenantId: process.env.WORK_IQ_TENANT_ID || "demo-tenant",
    clientId: process.env.WORK_IQ_CLIENT_ID || "demo-client"
  },
  app: {
    name: "EcoSplit-Enterprise",
    version: "1.0.0"
  }
};
