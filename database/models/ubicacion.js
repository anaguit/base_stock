function datosUbicacion(sequelize,DataTypes){
    alias="ubicacion";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        nombre_ubicacion:{type:DataTypes.STRING(50),allowNull:false}
    };

    let config = {timestamps:false};

    let ubicacion = sequelize.define(alias,cols,config);

    ubicacion.associate = function(modelos){
        ubicacion.hasMany(modelos.equipo,{
            as:"ubicacionEquipo",
            foreignKey:"id_ubicacion"
        })
    };

    return ubicacion;
};

module.exports = datosUbicacion;