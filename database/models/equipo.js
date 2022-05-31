function datosEquipo(sequelize,DataTypes){
    let alias="equipo";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        numero_serie:{type:DataTypes.STRING(30),allowNull:false},
        imel:{type:DataTypes.STRING(30),allowNull:false},
        logo:{type:DataTypes.STRING(10),allowNull:false},
        fecha_ingreso:{type:DataTypes.DATE},
        nr_antena:{type:DataTypes.INTEGER},
        fecha_cambio_ubicacion:{type:DataTypes.DATE},
        prioridad_asignacion:{type:DataTypes.STRING(10),allowNull:false}
    };
    let config = {timestamps:false};
    
    let equipo = sequelize.define(alias,cols,config);

    equipo.associate = function(modelos){
        equipo.belongsTo(modelos.marca,{
            as:"marcas",
            foreignKey:"id_marca"
        }),
        equipo.belongsTo(modelos.modelo,{
            as:"modelos",
            foreignKey:"id_modelo"
        }),
        equipo.belongsTo(modelos.forma_ingreso,{
            as:"ingresos",
            foreignKey:"id_forma_ingreso"
        }),
        equipo.belongsTo(modelos.ubicacion,{
            as:"ubicaciones",
            foreignKey:"id_ubicacion"
        })/*,
        equipo.belongsToMany(modelos.parte_n1,{
            as:"equipoParteN1",
            through:"evaluacion_parte_n1",
            foreignKey:"id_equipo",
            otherForeignKey:"id_parte_n1",
            timestamps:false
        }),
        equipo.belongsToMany(modelos.parte_n2,{
            as:"equipoParteN2",
            through:"evaluacion_parte_n2",
            foreignKey:"id_equipo",
            otherForeignKey:"id_parte_n2",
            timestamps:false
        }),
        equipo.belongsToMany(modelos.parte_n3,{
            as:"equipoParteN3",
            through:"evaluacion_parte_n3",
            foreignKey:"id_equipo",
            otherForeignKey:"id_parte_n3",
            timestamps:false
        })*/
    };

    return equipo;
};

module.exports = datosEquipo;