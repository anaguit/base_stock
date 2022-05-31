function datosIngreso(sequelize,DataTypes){
    
    let alias = "forma_ingreso";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        origen:{type:DataTypes.STRING(50),allowNull:false}
    };

    let config = {timestamps:false};

    let ingreso = sequelize.define(alias,cols,config);

    ingreso.associate = function(modelos){
        ingreso.hasMany(modelos.equipo,{
            as:"ingresoEquipo",
            foreignKey:"id_forma_ingreso"
        })
    };    

    return ingreso;
};

module.exports = datosIngreso;