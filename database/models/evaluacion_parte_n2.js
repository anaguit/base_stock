function datosEvaluacionN2(sequelize,DataTypes){
    
    let alias="Evaluacion_parte_n2";
    let cols = {
        id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true,allowNull:false},
        //id_parte_n2:,allowNull:false
        estado:{type:DataTypes.INTEGER,allowNull:false},
        costo:{type:DataTypes.INTEGER,allowNull:false},//ver si es decimal
        estado_final:{type:DataTypes.INTEGER,allowNull:false},
        //id_equipo:,allowNull:false
    };

    let config = {timestamps:false};

    let dataEvaluacionN2 = sequelize.define(alias,cols,config);

    return dataEvaluacionN2;
};

module.exports = datosEvaluacionN2;