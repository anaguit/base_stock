let{body}=require("express-validator");

let validacionCarga=[
    body("marca").notEmpty().withMessage("seleccionar marca"),
    body("modelo").notEmpty().withMessage("seleccionar modelo"),
    body("nrSerie").notEmpty().withMessage("completar campo").isLength({min:13,max:13}).withMessage("requiere 13 caractéres"),
    body("imel").notEmpty().withMessage("completar campo").isLength({min:15,max:15}).withMessage("requiere 15 numeros"),
    body("nrAntena").notEmpty().withMessage("completar campo"),
    body("formaIngreso").notEmpty().withMessage("seleccionar forma de ingreso"),
    body("ubicacion").notEmpty().withMessage("seleccionar ubicacion"),
    body("prioridad").notEmpty().withMessage("seleccionar 1 opcion"),
    body("logo").notEmpty().withMessage("seleccionar 1 opcion")
];

module.exports=validacionCarga;