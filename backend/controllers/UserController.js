
const User = require("../models/Users")

const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")

const  mongoose  = require("mongoose");
const jwtSecret = process.env.JWT_SECRET;

//gera o token do usuario

const generateToken = (id) =>{

    return jwt.sign({ id }, jwtSecret, {

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

    //res.send("Registro")

    //gera senha hash
	const salt = await bcrypt.genSalt()
	const passwordHash = await bcrypt.hash(password, salt)

	//Cria um novo usuario
	const newUser = await User.create({
		name,
		email,
		password:passwordHash
		});

	if(!newUser) {
		
		res.status(422).json({erros: ["Houve um erro do sistema"]})	
		
	return
	
	};
    //envia o token do usuario pra ele fazer o login
	res.status(201).json({
		_id: newUser._id,
		token:generateToken(newUser._id)
	});


};


const login = async (req, res) => {
	const { email, password } = req.body;
  
	const user = await User.findOne({ email });
  
	// Check if user exists
	if (!user) {
	  res.status(404).json({ errors: ["Usuário não encontrado!"] });
	  return;
	}
  
	// Check if password matches
	if (!(await bcrypt.compare(password, user.password))) {
	  res.status(422).json({ errors: ["Senha inválida!"] });
	  return;
	}
  
	// Return user with token
	res.status(200).json({
	  _id: user._id,
	  profileImage: user.profileImage,
	  token: generateToken(user._id),
	});
  };
  // acessa o perfil do usuario
const getCurrentUser = async (req, res) => {
	
	const user = req.user;
  
	res.status(200).json(user);
  };
// faz o update do usuario
const update = async (req,res) => {

	const {name, password, bio} = req.body

	let profileImage = null

	if(req.file){

		profileImage = req.file.filename

	}

	const reqUser = req.user

	const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password");

	if(name){
		user.name = name
	}
	
	if(password){

		   //gera senha hash
		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		user.password = passwordHash

	}

	if(profileImage){

		user.profileImage = profileImage
	}

	if(bio){

		user.bio = bio
	}

	await user.save()

	res.status(200).json(user)
}  

// Get user by id
const getUserById = async (req, res) => {
	const { id } = req.params;
	
		const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password");

	// Check if user exists
	if (!user) {
	res.status(404).json({ errors: ["Usuário não encontrado!"] });
	return;
	}

	res.status(200).json(user);
  };
  

module.exports = {

    register, 
		login,
		getCurrentUser,
		update,
		getUserById,
		
};
