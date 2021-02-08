import express from "express";
import { addSignature, getSignaturesArr } from "../signatures/api";

const app = express();

// 'Middleware' that parses JSON body data sent from the request
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "This is the default path - and it isn't very interesting, sorry. \nTry visiting localhost:4000/creation-time, localhost:4000/current-time"
  );
});

app.get("/signatures", (req, res) => {
  const signatures = getSignaturesArr();
  res.status(200).json({
    status: "success",
    data: {
      signatures,
    },
  });
});

app.post("/signatures", (req, res) => {
  const { name, message } = req.body;

  const signature = addSignature({ name, message });
  res.status(201).json({
    status: "success",
    data: { signature },
  });
});

export default app;
