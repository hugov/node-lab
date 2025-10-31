const client = require("prom-client");
const register = new client.Registry();

// Coletar métricas padrão do Node.js
client.collectDefaultMetrics({ register });

// Contador de requests HTTP
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total de requisições HTTP",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

// Histograma de duração das requests
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duração das requisições HTTP em segundos",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});

module.exports = {
  register,
  httpRequestsTotal,
  httpRequestDuration,
};
