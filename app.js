let express = require("express");
let path = require("path");
let methodOverride = require("method-override");

let app = express();
let rutasEquipo = require("./src/routers/rutasEquipo");
let rutasGenerales = require("./src/routers/rutasGenerales");

app.use(express.static(path.resolve(__dirname,"./public")));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views","./src/views");

app.listen(process.env.PORT||3000,()=>{console.log("servidor corriendo puerto 3000")});

app.use("/",rutasGenerales);
app.use("/equipo",rutasEquipo);