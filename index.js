const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();

//cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));


//Capturar cosas del body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//BD conexion
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.0mmnm.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const option = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(uri, option)

.then(() => console.log("Conexion exitosa a la base de datos"))
    .catch(e => console.log("Error al conectarse a la base de datos", e))

//importar rutas:
const authRoutes = require("./routes/auth");
const validaToken = require("./routes/validate-tokens");
const admin = require("./routes/admin")


//routes middlewares:
app.use("/api/user", authRoutes);
app.use("/api/admin", validaToken, admin)
app.get("/", (req, res) => {
    res.json({
        estado: true,
        mensaje: "funciona"
    })
});

//Iniciar server
const PORT = process.env.PORT || 40;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`)
})