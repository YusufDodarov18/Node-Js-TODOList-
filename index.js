const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    title,
    completed: false,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (title !== undefined) products[productIndex].title = title;
  if (completed !== undefined) products[productIndex].completed = completed;

  res.json(products[productIndex]);
});

app.patch("/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) return res.status(404).json({error: "Not found"});
    product.completed = !product.completed;
    res.json(product);
});


app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const productExists = products.find(p => p.id === id);
  if (!productExists) {
    return res.status(404).json({ error: "Product not found" });
  }
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
