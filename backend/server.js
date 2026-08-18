const express = require("express");
const cors = require("cors");
const path = require('path');

// importando as rotas criadas
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3001;

//middlewares principais
app.use(cors());
// escreve e ler requisiçoes com formato json
app.use(express.json());

app.use(express.static(path.join(__dirname,"../frontend")));

app.use("/api", authRoutes);

app.get('/', (req,res)=>{ 
    res.sendFile(path.join(__dirname,'../frontend/index.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});