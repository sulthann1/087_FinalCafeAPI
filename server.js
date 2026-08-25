import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";
import cafeRoutes from "./routes/cafeRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Jogja Cafe Data API"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/keys", apiKeyRoutes);
app.use("/api/v1/cafes", cafeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Server hanya 'listen' secara lokal
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// BARIS INI WAJIB ADA UNTUK VERCEL
export default app;