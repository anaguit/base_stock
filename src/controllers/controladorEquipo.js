const { promiseImpl } = require("ejs");
let{ validationResult } = require("express-validator");
let{ sequelize, Sequelize } = require('../../database/models');

let db = require("../../database/models");
let Op = db.Sequelize.Op;

let controladorEquipo ={
    formularioCarga:(req,res)=>{           
        
        let pedidoMarca = db.marca.findAll();
        let pedidoModelo = db.modelo.findAll();
        let pedidoUbicacion = db.ubicacion.findAll();
        let pedidoFormaIngreso = db.forma_ingreso.findAll();

        Promise.all([pedidoMarca,pedidoModelo,pedidoUbicacion,pedidoFormaIngreso])
        .then(([marcas,modelos,ubicaciones,formasIngreso])=>{
            res.render("formularioRegistro",{marcas:marcas,modelos:modelos, ubicaciones:ubicaciones,formasIngreso:formasIngreso})
        })
        .catch(function(error){
            console.log(error)
        });
    },
    cargarEquipo:(req,res)=>{       
        errores=validationResult(req);
        if (errores.isEmpty()){
            db.equipo.create({
                numero_serie:req.body.nrSerie,
                imel:req.body.imel,
                logo:req.body.logo,
                nr_antena:req.body.nrAntena,
                id_marca:req.body.marca,
                id_modelo:req.body.modelo,
                id_forma_ingreso:req.body.formaIngreso,
                id_ubicacion:req.body.ubicacion,
                prioridad_asignacion:req.body.prioridad

            }).then((resultados)=>{
                console.log(resultados)
                res.render("guardadoExito")
            })
        }
        else {
            let pedidoMarca = db.marca.findAll();
            let pedidoModelo = db.modelo.findAll();
            let pedidoUbicacion = db.ubicacion.findAll();
            let pedidoFormaIngreso = db.forma_ingreso.findAll();

        console.log(req.body);

            Promise.all([pedidoMarca,pedidoModelo,pedidoUbicacion,pedidoFormaIngreso])
            .then(([marcas,modelos,ubicaciones,formasIngreso])=>{
                res.render("formularioRegistro",{errores:errores.mapped(),
                                        datos:req.body,
                                        marcas:marcas,modelos:modelos, 
                                        ubicaciones:ubicaciones,
                                        formasIngreso:formasIngreso})
            });
        };
    },
    resultadosBusqueda:(req,res)=>{
        db.equipo.findOne({
            where:{numero_serie:req.body.numeroSerie},
            //attributes: [[ sequelize.fn("DATE", sequelize.col('fecha_ingreso')), 'fecha_ingreso']],
            include:[{association:"marcas"},
                    {association:"modelos"},
                    {association:"ingresos"},
                    {association:"ubicaciones"}]
        }).then((equipo) => {
            if(equipo !== null){
                res.render("detalle",{equipo})}
                else{
                    res.render("noEncontrado")
                }
            console.log(equipo)
        });
    },
    editar:(req,res)=>{
        let pedidoMarca = db.marca.findAll();
        let pedidoModelo = db.modelo.findAll();
        let pedidoUbicacion = db.ubicacion.findAll();
        let pedidoFormaIngreso = db.forma_ingreso.findAll();
        
        db.equipo.findOne({
            where:{numero_serie:req.params.numero_serie}
        }).then((equipo)=>{
            Promise.all([pedidoMarca,pedidoModelo,pedidoUbicacion,pedidoFormaIngreso])
                .then(([marcas,modelos,ubicaciones,formasIngreso])=>{
                res.render("editar",{equipo:equipo,marcas:marcas,
                                    modelos:modelos,ubicaciones:ubicaciones,
                                    formasIngreso:formasIngreso})
            });
        });
    },
    guardarEdicion:(req,res)=>{
        console.log(req.body)
        errores=validationResult(req);
        if (errores.isEmpty()){
            db.equipo.update({
                numero_serie:req.body.numero_serie,
                imel:req.body.imel,
                logo:req.body.logo,
                nr_antena:req.body.nr_antena,
                id_marca:req.body.marca,
                id_modelo:req.body.modelo,
                id_forma_ingreso:req.body.formaIngreso,
                id_ubicacion:req.body.ubicacion,
                prioridad_asignacion:req.body.prioridad_asignacion
            },
                {where:{numero_serie:req.body.numero_serie}}
            ).then((equipo)=>{
                res.render("editadoExito",{equipo});
            });
        }
        else {
            let pedidoMarca = db.marca.findAll();
            let pedidoModelo = db.modelo.findAll();
            let pedidoUbicacion = db.ubicacion.findAll();
            let pedidoFormaIngreso = db.forma_ingreso.findAll();

        console.log(req.body)

            Promise.all([pedidoMarca,pedidoModelo,pedidoUbicacion,pedidoFormaIngreso])
            .then(([marcas,modelos,ubicaciones,formasIngreso])=>{
                res.render("editar",{errores:errores.mapped(),equipo:req.body,marcas:marcas,modelos:modelos, ubicaciones:ubicaciones,formasIngreso:formasIngreso})
                console.log(req.body)
            });
        };
    },
    eliminar:(req,res)=>{
        db.equipo.destroy({
            where:{numero_serie:req.body.numero_serie}
        }).then((equipo)=>{
            res.redirect("/")
        });
    },
    listado:(req,res)=>{
        db.equipo.findAll({
            include:[{association:"marcas"},
                    {association:"modelos"}]
        })
        .then((equipos)=>{
            res.render("listaEquipos",{equipos:equipos})
        })
    },
    detalle:(req,res)=>{
        db.equipo.findOne({
            where:{numero_serie:req.params.numero_serie},
            include:[{association:"marcas"},
                    {association:"modelos"},
                    {association:"ingresos"},
                    {association:"ubicaciones"}]
        }).then((equipo) => {
                res.render("detalle",{equipo:equipo})
                })
    },
    consultarUbicacion:(req,res)=>{
        db.equipo.findAll({
            where:[{id_ubicacion:req.query.ubicacion}],
            attributes:["id_ubicacion",
                [sequelize.fn("COUNT",sequelize.col("id_ubicacion")),"cuenta_ubicacion"]],
                group:"id_ubicacion",
                include:[{association:"ubicaciones"},{association:"ingresos"},
                        {association:"modelos"},{association:"marcas"}]
        })
        .then((equipos)=>{
            console.log(equipos)
            res.render("consultaUbicacion",{equipos})
        });
    },
    consultarIngreso:(req,res)=>{
        db.equipo.findAll({
            where:[{id_forma_ingreso:req.query.forma_ingreso}],
            attributes:["id_forma_ingreso",
                [sequelize.fn("COUNT",sequelize.col("id_forma_ingreso")),"cuenta_forma_ingreso"]],
                group: "id_forma_ingreso",
                include:[{association:"marcas"},{association:"modelos"},
                    {association:"ingresos"},{association:"ubicaciones"}]
        })
        .then((equipos)=>{
            console.log(equipos)
            res.render("consultaIngreso",{equipos})
        });
    },
    consultarMarca:(req,res)=>{
        db.equipo.findAll({
            where:[{id_marca:req.query.marca}],
            attributes:["id_marca",
                [sequelize.fn("COUNT", sequelize.col("id_marca")),"cuenta_marca"]],
                group: "id_marca",
                include:[{association:"marcas"},{association:"modelos"},
                    {association:"ingresos"},{association:"ubicaciones"}]
        })
        .then((equipos)=>{
            console.log(equipos)
            res.render("consultaMarca",{equipos})
        });
    },
    consultarModelo:(req,res)=>{
        db.equipo.findAll({
            where:[{id_modelo:req.query.modelo}],
            attributes:["id_modelo",
                [sequelize.fn("COUNT",sequelize.col("id_modelo")),"cuenta_modelo"]],
                group: 'id_modelo',
                include:[{association:"marcas"},{association:"modelos"},
                    {association:"ingresos"},{association:"ubicaciones"}]         
        })
        .then((equipos)=>{
            res.render("consultaModelo",{equipos:equipos})
        });
    },
    prueba:(req,res)=>{
        db.equipo.findAll({
            where:[{id_forma_ingreso:req.body.numeroSerie}],
            attributes: [[ sequelize.fn('YEAR', sequelize.col('fecha_ingreso')), 'fecha_ingreso']],
                include:[{association:"marcas"},{association:"modelos"},
                    {association:"ingresos"},{association:"ubicaciones"}]
        })
        .then((equipos)=>{
            console.log(equipos)
            res.send(equipos)
        });
    }
};

module.exports=controladorEquipo;