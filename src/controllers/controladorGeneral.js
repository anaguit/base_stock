let{ sequelize, Sequelize } = require('../../database/models');
let db = require("../../database/models");
let Op = db.Sequelize.Op;

let controladorGeneral={
    inicio:(req,res)=>{
        let pedidoMarca = db.marca.findAll();
        let pedidoModelo = db.modelo.findAll();
        let pedidoUbicacion = db.ubicacion.findAll();
        let pedidoFormaIngreso = db.forma_ingreso.findAll();

        Promise.all([pedidoMarca,pedidoModelo,pedidoUbicacion,pedidoFormaIngreso])
        .then(([marcas,modelos,ubicaciones,formasIngreso])=>{
            res.render("inicio",{marcas:marcas,modelos:modelos, 
                                ubicaciones:ubicaciones,
                                formasIngreso:formasIngreso})
        })
    }
};

module.exports = controladorGeneral;