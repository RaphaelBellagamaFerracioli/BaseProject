const express = require("express");
const router = express.Router();
const axios = require('axios');

// Controller
const { insertPhoto,
        deletePhoto,
        getAllPhotos, 
       
        getUserPhotos,
        getPhotoById,
        updatePhoto,
        likePhoto,
        commentPhoto,
        searchPhotos
         } = require("../controllers/photController");
 
// Middlewares
const { photoInsertValidation, photoUpdateValidation,commentValidation } = require("../middlewares/photoValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUploader");
 
const validateWithJavaServer = async (photoData) => {
    try {
        const response = await axios.post('http://localhost:8000/validatePhoto', photoData);
        return response.data.isValid;
    } catch (error) {
        console.error("Erro ao validar com o servidor Java:", error);
        return false;
    }
};

// Routes
router.post(
    "/",
    authGuard, 
    imageUpload.single("image"), 
    photoInsertValidation(), 
    validate,
    // async (req, res, next) => {
    //     const isValid = await validateWithJavaServer(req.body);
    //     if (!isValid) {
    //         return res.status(400).send("Dados do post inválidos.");
    //     }
    //     next();
    // },
    insertPhoto
);

//faz o delete da imagem
router.delete( "/:id",
authGuard, deletePhoto)

//chama todas as fotos
router.get("/", authGuard, getAllPhotos)

//chama o post especifico
router.get("/user/:id", authGuard, getUserPhotos)

//rota para pesquiza dos posts, crei aqui para não haver confusão com outros ids
router.get("/search/",authGuard, searchPhotos)

//pega o post pelo id
router.get("/:id",authGuard, getPhotoById )

//faz o update do post
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto)

//curti post
router.put("/like/:id", authGuard, validate, likePhoto);
 
//comentarios para o post

 router.put("/comment/:id", authGuard,commentValidation(), commentPhoto,validate  )



module.exports = router;