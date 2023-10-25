const express = require("express")
require("dotenv").config()


const paht = require("path")
const cors = require("cors")

const port = process.env.PORT;

const app = express();

//config JSON and form Data
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//cors
app.use(cors({credentials:true, origin: "http://localhost:3000"}));

//Upload 
app.use("/uploads", express.static(paht.join(__dirname, "/uploads")));//dirname é o nome do diretório

//routes 
const router = require("./routes/Router.js");
const { decodeBase64 } = require("bcryptjs");

//conexao com o banco de dados
require("./config/db.js")


app.use(router)

app.listen(port, () =>{

    console.log(`Porta rodando em ${port}`)

})