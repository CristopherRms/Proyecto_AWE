const mongoose = require("mongoose");
const connectDB=()=>{
    mongoose.connect(process.env.CONECTIONDB,{
        dbName:process.env.DB_NAME
    }).then(
        () => {
            console.log("Conexión exitosa con la DB");
        }
    ).catch((error) => {
        console.log("Error al conectar con la DB");
        console.log(error);
    });

}

module.exports= connectDB;