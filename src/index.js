import express from "express";
import http from "http";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/auth.js";
import authMiddleware from "./middleware/auth.js";
import supabase from "./supabase.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
);

// Rotas REST (exemplo)
app.get("/", (req, res) => {
    res.send({
        message: "API do Chat rodando 🚀",
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description
    });
});

// Rotas públicas
app.use("/auth", authRoutes);

// rota protegida
app.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Perfil do usuário", user: req.user });
});

app.get("/users", authMiddleware, async (req, res) => {
    const { data, error } = await supabase.from("users").select("id, username");
    if (error) return res.status(500).json({ error: error.message });

    const users = data.filter((u) => u.username !== req.user.username);
    res.json(users);
});

app.get("/messages/:userId/:contactId", async (req, res) => {
    const { userId, contactId } = req.params;

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`)
        .order("created_at", { ascending: true });

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
