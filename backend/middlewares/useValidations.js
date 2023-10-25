const { body } = require("express-validator")

const userCreatValidation = () => {

	return [
        body("name").isString().withMessage("o nome é obrigatório")];
        // .isLength({ min:3 })
        // .withMessage("o nome precisa ter no minimo 3 caracteres."),
        
        // body("email")
        // .isString()
        // .withMessage("a senha é obrigatório")
        // .isEmail()
        // .withMessage("Insira um email valido "),
        // body("password")
        // .isLength({ min: 5 })
        // .withMessage("A senha precisa ter no minimo 5 caracteres "),

        // body("confirmaPassword")
        // .isString()
        // .withMessage("A confirmação de senha é obrigatória "),
        
        // custom((value, {req}) => {

        //     if(value != req.body.password) {
        //         throw new Erro("As senhas não são iguais");
        // }
        // return true;
    
        // })];
    
        };

module.exports = { userCreatValidation, };
