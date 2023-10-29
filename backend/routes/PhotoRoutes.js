const express = require("express");
const router = express.Router();
 
// Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto,commentPhoto, searchPhotos } = require("../controllers/photController");
 
// Middlewares
const { photoInsertValidation, photoUpdateValidation,commentValidation } = require("../middlewares/photoValidations");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUploader");
 
// Routes
router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoInsertValidation(),
    validate,
    insertPhoto,
);
//faz o delete da imagem
router.delete( "/:id",
authGuard, deletePhoto)

//chama todas as fotos
router.get("/", authGuard, getAllPhotos)

//chama todas as fotos
router.get("/user/:id", authGuard, getUserPhotos)

//rota para pesquiza dos posts, crei aqui para não haver confusão com outros ids
router.get("/search/",authGuard, searchPhotos)

//pega a foto pelo id
router.get("/:id",authGuard, getPhotoById )

//faz o update da foto
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto)

//faz curti a foto
router.put("/like/:id", authGuard, validate, likePhoto);
 
//comentarios para o post

 router.put("/comment/:id", authGuard,commentValidation(), commentPhoto,validate  )



module.exports = router;