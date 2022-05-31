let express= require("express");
let router= express.Router();
let controladorGeneral = require("../controllers/controladorGeneral");

router.get("/",controladorGeneral.inicio);


module.exports = router;