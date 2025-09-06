import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../supabase.js";

const router = express.Router();

// Registrar usuário
router.post("/register", async (req, res) => {
    try {
        console.log("Registro de usuário:", req.body);
        const { username, password } = req.body;
        console.log("Dados recebidos:");

        // verifica se já existe
        const { data: existing } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .single();

        console.log("Usuário existente:", existing);

        if (existing) {
            console.log("Usuário já existe:", username);

            return res.status(400).json({ error: "Usuário já existe" });
        }
        console.log("Criando novo usuário:", username);

        // criptografa senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const { error } = await supabase
            .from("users")
            .insert([{ username, password: hashedPassword }]);

        console.log("Erro ao inserir usuário:", error);

        if (error) return res.status(500).json({ error: error.message });

        res.json({ message: "Usuário registrado com sucesso!" });
    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        console.error("Dados recebidos:", req.body);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// Login
router.post("/login", async (req, res) => {
    console.log("Login de usuário:", req.body);

    try {
        const { username, password } = req.body;
        console.log("Dados recebidos:", { username, password });

        const { data: user } = await supabase
            .from("users")
            .select("*")
            .eq("username", username)
            .single();

        if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).json({ error: "Senha inválida" });

        const token = jwt.sign(
            { id: user.id, username: user.username },
            "segredo_super_secreto",
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {

        console.log("Erro ao fazer login:", err);

        res.status(500).json({ error: "Erro no servidor" });
    }
});

export default router;
