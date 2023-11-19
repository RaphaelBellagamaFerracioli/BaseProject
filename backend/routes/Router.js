const express = require("express");
const axios = require('axios');

const router = express()

router.use("/api/users", require("./UserRoutes"));

router.use("/api/photos", require("./PhotoRoutes"))

//teste de rota
router.get("/", (req, res) =>{

    res.send("API funcionando")
    
});


module.exports = router;

