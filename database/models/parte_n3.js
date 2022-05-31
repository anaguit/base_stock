function datosParteN3(sequelize,DataTypes){
    let alias="parte_n3";
    let cols={
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        item:{type:DataTypes.STRING(50),allowNull:false}
    };
    let config={timestamps:false};

    let ParteN3 = sequelize.define(alias,cols,config);

    /*ParteN3.associate = function(modelos){
        ParteN3.belongsToMany(modelos.equipo,{
            as:"ParteN3Equipo",
            through:"evaluacion_parte_n3",
            foreignKey:"id_parte_n3",
            otherForeignKey:"id_equipo",
            timestamps:false
        })
    };*/

    return ParteN3;
};

module.exports = datosParteN3;