const express = require("express");
const ratelimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");

const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();

const limiter = ratelimit({
  windowMs: 2 * 60 * 1000, //2 minutes
  max: 3, //limit each IP to 3 requests per 'window'
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use(
  "/flightsService",
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE,
    changeOrigin: true,
  })
);

app.use(
  "/bookingService",
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
  })
);

app.get("/home",(req,res) => {
  return res.json({message: "OK"});
});

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
  Logger.info("Successfully started the server");
});
