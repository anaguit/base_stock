function datosMarca(sequelize,DataTypes){
    let alias="marca";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        nombre:{type:DataTypes.STRING(30),allowNull:false}
    };

    let config = {timestamps:false};

    let marca = sequelize.define(alias,cols,config);

    marca.associate = function(modelos){
        marca.hasMany(modelos.equipo,{
            as:"equipos",
            foreignKey:"id_marca"
        })
    };

    return marca;
};

module.exports = datosMarca;