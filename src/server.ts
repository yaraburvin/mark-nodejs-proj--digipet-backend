import express from "express";
import { Digipet, initialDigipet, getDigipet, resetDigipet } from "./digipet";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
  });
});

app.get("/digipet/hatch", (req, res) => {
  if (getDigipet()) {
    res.json({
      message: "You can't hatch a digipet now because you already have one!",
    });
  } else {
    resetDigipet();
    res.json({
      message: "You have hatched an adorable new digipet. Just the cutest.",
    });
  }
});

app.get("/digipet/walk", (req, res) => {
  // check the user has a digipet to walk
  if (getDigipet()) {
    res.json({
      message: "You walked your digipet. It looks happier now!",
    });
  }
});

app.get("/digipet/reset", (req, res) => {
  res.json({
    message:
      "Are you sure you want to reset your digipet? It's a bit inhumane, in all honesty. Please visit /digipet/reset/confirm to confirm that you want to reset your digipet. This cannot be undone!",
  });
});

app.get("/joke", (req, res) => {
  res.json({
    message: "Knock knock?",
    nextEndpoint: "/joke/whos-there",
  });
});

app.get("/joke/whos-there", (req, res) => {
  res.json({
    message: "To.",
    nextEndpoint: "/joke/to-who",
  });
});

app.get("/joke/to-who", (req, res) => {
  res.json({
    message: "No... to WHOM!",
  });
});

export default app;
