const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//connection

const conn = async ()=>{

        try{

            const dbConn = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.4egsdi6.mongodb.net/?retryWrites=true&w=majority`);

        console.log("Conexão feita!")
        return dbConn;
        console.log("Conectou ao banco");

        }catch(error){
        console.log(error)
    }
};

conn();

module.exports = conn;
