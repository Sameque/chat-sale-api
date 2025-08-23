const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());

// Rotas REST (exemplo)
app.get("/", (req, res) => {
    res.send("API do Chat rodando 🚀");
});


// // Rotas públicas
// app.use("/auth", authRoutes);

// // Exemplo de rota protegida
// app.get("/profile", authMiddleware, (req, res) => {
//     res.json({ message: "Perfil do usuário", user: req.user });
// });

// app.get("/users", authMiddleware, async (req, res) => {
//     const { data, error } = await supabase.from("users").select("id,username");
//     if (error) return res.status(500).json({ error: error.message });

//     const users = data.filter((u) => u.username !== req.user.username);
//     res.json(users);
// });

// app.get("/messages/:userId/:contactId", async (req, res) => {
//     const { userId, contactId } = req.params;

//     const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .or(`and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`)
//         .order("created_at", { ascending: true });

//     if (error) return res.status(400).json({ error: error.message });
//     res.json(data);
// });

// const supabase = require("./supabase");
// const jwt = require("jsonwebtoken");

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     if (!token) return next(new Error("Token não fornecido"));

//     try {
//         const decoded = jwt.verify(token, "segredo_super_secreto");
//         socket.user = decoded;
//         next();
//     } catch (err) {
//         next(new Error("Token inválido"));
//     }
// });


// io.on("connection", (socket) => {

//     socket.join(socket.user.username);

//     socket.on("privateMessage", async (receivedMsg) => {
//         try {

//             console.log("Mensagem recebido:", receivedMsg);

//             const sendMsg = {
//                 sender_id: receivedMsg.senderId,
//                 receiver_id: receivedMsg.receiverId,
//                 content: receivedMsg.content,
//                 created_at: receivedMsg.createdAt || new Date().toISOString()
//             };

//             console.log("Enviando mensagem:", sendMsg);
            
//             const { data, error } = await supabase
//                 .from("messages_chat")
//                 .insert([sendMsg])
//                 .select()
//                 .single();

//             if (error) {
//                 console.error("Erro ao salvar mensagem:", error);
//                 return;
//             }

//             console.log(socket.user, "enviou uma mensagem para", receivedMsg.receiver, ":", data);
            
//             // envia para o destinatário e para o remetente
//             io.to(receivedMsg.receiver).emit("privateMessage", data);
//             io.to(socket.user.username).emit("privateMessage", data);

//         } catch (err) {
//             console.error("Erro:", err);
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("Usuário saiu:", socket.user.username);
//     });
// });

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
   console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// module.exports = server;
