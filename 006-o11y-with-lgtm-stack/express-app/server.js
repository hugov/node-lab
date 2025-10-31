require("./tracing"); // Deve ser a primeira linha!
const logger = require("./logger");
const {
  register,
  httpRequestsTotal,
  httpRequestDuration,
} = require("./metrics");
const express = require("express");

const app = express();

// Middleware para coletar métricas
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route ? req.route.path : req.path;

    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route: route,
        status_code: res.statusCode,
      },
      duration
    );
  });

  next();
});

app.get("/", (req, res) => {
  logger.info("Rota raiz acessada com sucesso");
  res.send("Hello Observability!");
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3001, () => {
  logger.info("Servidor Express rodando na porta 3001!");
  console.log("Servidor Express rodando na porta 3001!");
});
