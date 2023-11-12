const { default: mongoose } = require("mongoose");
const Photo = require("../models/Photo")
const User = require("../models/Users");

const moongose = require("mongoose")

//inseri a foto, e relata o usuario 
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    
    const image = req.file.filename;
    
    const { conteudo } = req.body;

    console.log(req.body);

    const reqUser = req.user;
    
    const user = await User.findById(reqUser._id);

    console.log(user.name);

    //Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        conteudo,
        userId: user._id,
        userName: user.name,
    });
 
    

    // caso aja erro 
    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente mais tarde."],
        });

        return;
    }
 
    res.status(201).json(newPhoto);
};



const deletePhoto = async (req, res) => {
    const { id } = req.params;
  
    const reqUser = req.user;
    
    const photo = await Photo.findById(new moongose.Types.ObjectId(id));
  
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  
    await Photo.findByIdAndDelete(photo._id);
  
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  };
 
  //vai chamar todas as fotos

  const getAllPhotos = async(req,res) =>{

    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)

  }
  // pega as fotos do usuario
const getUserPhotos = async (req, res) => {
	const { id } = req.params;
  
	const photos = await Photo.find({ userId: id })
	  .sort([["createdAt", -1]])
	  .exec();
  
	return res.status(200).json(photos);
  };
 // Get photo by id
const getPhotoById = async (req, res) => {
    const { id } = req.params;
  
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
  
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    res.status(200).json(photo);
  };

  // Update a photo
const updatePhoto = async (req, res) => {
    
    const { id } = req.params;
    const { title } = req.body;
    const {conteudo} = req.body;

  
    let image;
  
    if (req.file) {
      image = req.file.filename;
    }
  
    const reqUser = req.user;
  
    const photo = await Photo.findById(id);
  
    // Check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }
  
    if (title) {
      photo.title = title;
    }

    if(conteudo) {

      photo.conteudo = conteudo;
    }
  
    if (image) {
      photo.image = image;
    }
    await photo.save();
  
    res.status(200).json({ photo, message: "Post atualizada com sucesso!" });
  };


  // linkes no post
  const likePhoto = async (req, res) => {
    const { id } = req.params;
  
    const reqUser = req.user;
  
    const photo = await Photo.findById(id);
  
    // checa se a uma foto
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
  
    // Check if user already liked the photo
    if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({ errors: ["Você já curtiu esta foto."] });
      return;
    }
  
    // Put user id in array of likes
    photo.likes.push(reqUser._id);
  
    await photo.save();
  
    res
      .status(200)
      .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });
  };


// Comment functionality
const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const photo = await Photo.findById(id);

  // Check if photo exists
  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

//pesquiza dos posts
const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};



module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
};