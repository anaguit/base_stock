let express = require("express");
let router = express.Router();
let controladorEquipo = require("../controllers/controladorEquipo");

let validacionCarga = require("../middlewares/validacionCargaEquipo");
let validacionEdicion = require("../middlewares/validacionEditarEquipo");

router.get("/registrar",controladorEquipo.formularioCarga);
router.post("/registrar",validacionCarga,controladorEquipo.cargarEquipo);
router.get("/detalle/:numero_serie",controladorEquipo.detalle); //ver!!!!!!
router.post("/resultados",controladorEquipo.resultadosBusqueda); //ver!!!!!
router.get("/editar/:numero_serie",controladorEquipo.editar);
router.put("/editar",validacionEdicion,controladorEquipo.guardarEdicion);

//administrador
router.get("/listado",controladorEquipo.listado);
router.delete("/eliminar",controladorEquipo.eliminar);

//consultas
router.get("/consulta/ubicacion",controladorEquipo.consultarUbicacion);
router.get("/consulta/ingreso",controladorEquipo.consultarIngreso);
router.get("/consulta/modelo",controladorEquipo.consultarModelo);
router.get("/consulta/marca",controladorEquipo.consultarMarca);


module.exports=router