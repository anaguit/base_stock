function datosParteN2(sequelize,DataTypes){
    let alias = "Parte_n2";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        item:{type:DataTypes.STRING(50),allowNull:false}
    };

    let config = {timestamps:false};

    let ParteN2 = sequelize.define(alias,cols,config);

    /*ParteN2.associate = function(modelos){
        ParteN2.belongsToMany(modelos.equipo,{
            as:"parteN2Equipo",
            through:"evaluacion_parte_2",
            foreignKey:"id_parte_n2",
            otherForeignKey:"id_equipo",
            timestamps:false
        })
    };*/

    return ParteN2;
};

module.exports = datosParteN2;