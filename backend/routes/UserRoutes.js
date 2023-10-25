const express = require("express")
const router = express.Router();

//Controller

const {register} = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidation")

const { userCreatValidation } = require("../middlewares/useValidations");

//Routes
router.post("/register", userCreatValidation(),validate, register);

module.exports = router;