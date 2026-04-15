const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

let requests = [];

// GET
app.get("/requests", (req, res) => {
  res.json(requests);
});

// POST
app.post("/requests", (req, res) => {
  const { title, description } = req.body;

  if (!title || title.length < 3) {
    return res.status(400).json({ error: "Название короткое" });
  }

  if (!description || description.length < 5) {
    return res.status(400).json({ error: "Описание короткое" });
  }

  const newRequest = {
    id: Date.now(),
    title,
    description
  };

  requests.push(newRequest);

  res.json(newRequest);
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});