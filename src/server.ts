import express from "express";
import { getSignaturesArr } from "../data/signatures";

const app = express();

app.get("/", (req, res) => {
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/signatures", (req, res) => {
  const signatures = getSignaturesArr();
  res.json({
    status: "success",
    data: {
      signatures,
    },
  });
});

export default app;
