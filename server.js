const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    "/favoriteSpot",
    createProxyMiddleware({
      target: "https://b8aalc26tj.execute-api.ap-northeast-1.amazonaws.com",
      changeOrigin: true,
    })
  );
  server.use(
    "/savedRoutes",
    createProxyMiddleware({
      target: "https://2ivgwxgwgk.execute-api.ap-northeast-1.amazonaws.com",
      changeOrigin: true,
    })
  );

  server.use(
    "/routes",
    createProxyMiddleware({
      target: "https://w52wtr6g8k.execute-api.ap-northeast-1.amazonaws.com",
      changeOrigin: true,
    })
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
