const express = require("express");
const http = require("http")
const cors  = require("cors")
const authRoutes = require("./routes/authRoutes");
const mongoose = require('mongoose');
const socketServer = require('./socketServer')
require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;
const HOSTNAME = '0.0.0.0'

const app = express();
app.use(express.json());
const corsOptions = {
  methods: ['GET', 'POST', 'PUT'],
  origin:"*",
};
app.use(cors(corsOptions));
//Register
app.use("/api/auth", authRoutes);

const server = http.createServer(app, (req, res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end();
});
socketServer.registerSocketServer(server);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
    server.listen(PORT, HOSTNAME, ()=>{
        console.log("Serverport", PORT);
    });
}).catch(error => console.error(error));
app.use("/", (req, res) => {
  res.json({ message: "Hello From Express App" });
});

app.listen(PORT, () => {
  console.log(`Starting Server on Port ${PORT}`);
});
