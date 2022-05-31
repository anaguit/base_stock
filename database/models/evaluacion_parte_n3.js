function datosEvaluacionN3(sequelize,DataTypes){
    let alias = "Evaluacion_parte_n3";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        //id_parte_n3:,allowNull:false
        estado:{type:DataTypes.INTEGER,allowNull:false},
        costo:{type:DataTypes.INTEGER,allowNull:false},//ver si es decimal
        estado_final:{type:DataTypes.INTEGER,allowNull:false},
        //id_equipo:,allowNull:false
    };
    let config = {timestamps:false};

    let dataEvaluacionN3 = sequelize.define(alias,cols,config);

    return dataEvaluacionN3;
};

module.exports = datosEvaluacionN3;