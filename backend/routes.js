import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secret = "secret123";
let items = [];
let nextId = 1;

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "pass") {
    const token = jwt.sign({ username }, secret);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send();
  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).send();
  }
}

router.use("/items", authMiddleware);

router.get("/items", (req, res) => res.json(items));

router.post("/items", (req, res) => {
  const { text } = req.body;
  const item = { id: nextId++, text };
  items.push(item);
  res.status(201).json(item);
});

router.put("/items/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const item = items.find(i => i.id === +id);
  if (!item) return res.status(404).send();
  item.text = text;
  res.json(item);
});

router.delete("/items/:id", (req, res) => {
  const { id } = req.params;
  const idx = items.findIndex(i => i.id === +id);
  if (idx === -1) return res.status(404).send();
  items.splice(idx, 1);
  res.status(200).send();
});

export default router;
