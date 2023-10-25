const { default: mongoose, Schema } = require("mongoose");


const userShema = new Schema({

    name: String,
    email:String,
    password:String,
    profileImage:String,
    bio: String
},
{

    timestamps: true //vai marcar o horario que o usuario foi autorizado a entrar na sessão
}

);

const User = mongoose.model("User", userShema);

module.exports = User;