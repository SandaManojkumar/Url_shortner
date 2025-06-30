const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { nanoid } = require("nanoid");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/urlshort", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Url = mongoose.model("Url", new mongoose.Schema({
  short: String,
  original: String,
}));

app.post("/shorten", async (req, res) => {
  const short = nanoid(7);
  const original = req.body.original;
  const newUrl = new Url({ short, original });
  await newUrl.save();
  res.json({ short });
});

app.get("/:short", async (req, res) => {
  const record = await Url.findOne({ short: req.params.short });
  if (record) return res.redirect(record.original);
  res.status(404).send("Not Found");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
