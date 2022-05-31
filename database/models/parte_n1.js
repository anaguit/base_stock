function datosParteN1(sequelize,DataTypes){

    let alias = "Parte_n1";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        item:{type:DataTypes.STRING(50),allowNull:false}
    };

    let config = {timestamps:false};

    let ParteN1 = sequelize.define(alias,cols,config);

    /*ParteN1.associate = function(modelos){
        ParteN1.belongsToMany(modelos.equipo,{
            as:"parteN1Equipo",
            through:"evaluacion_parte_n1",
            foreignKey:"id_parte_n1",
            otherForeignKey:"id_equipo",
            timestamps:false
        })
    };*/
    return ParteN1;
};

module.exports = datosParteN1