function datosModelo(sequelize,DataTypes){
    let alias = "modelo";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        nombre:{type:DataTypes.STRING(40),allowNull:false}
    };
    let config = {timestamps:false};

    let modelo = sequelize.define(alias,cols,config);
    
    modelo.associate = function(modelos){
        modelo.hasMany(modelos.equipo,{
            as:"modeloEquipo",
            foreignKey:"id_modelo"
        })
    };

    return modelo;
};

module.exports = datosModelo;