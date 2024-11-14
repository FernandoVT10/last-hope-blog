import express from "express";

const app = express();

app.get("/api/ok", (_, res) => {
  res.send("Ok");
});

export default app;
