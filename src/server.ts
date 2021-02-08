import express from "express";
import { addSignature, getSignaturesArr } from "../signatures/api";

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

app.post("/signatures", (req, res) => {
  const { name, message } = req.body;

  addSignature({ name, message });
});

export default app;
