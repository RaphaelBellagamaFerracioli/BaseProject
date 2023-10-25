
const User = require("../models/Users")


const bcryptj = require("bcryptjs")
const jwt = require("jsonwebtoken")


const jwtSecret = process.env.JWT_SECRET;

//gera o token do usuario

const generateToken = (id) =>{

    return jwt.sign({id}, jwtSecret, {

        expiresIn:"7d",

    });
};

//registra o usuario logado
const register = async(req, res) =>{

    const {name, email, password} = req.body

    const user = await User.findOne({email})

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
        return;
    }

    res.send("Registro")
}

module.exports = {

    register, 

};
