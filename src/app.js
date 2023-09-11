const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const handlebars = require('express-handlebars');
const app = express()
const PORT = 8010

const userRouter = require('./routes/user.router.js')
const productRouter= require('./routes/product.router.js');
const viewRouter=require('./routes/view.router.js')
const cartRouter= require('./routes/cart.router.js')



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT} `)
})

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//conectar a base de datos mongoose

const enviroment = async () => {

    await mongoose.connect('mongodb+srv://girmar14:d1CYrI8pl75TyQw5@e-commerce.s0glbx3.mongodb.net/?retryWrites=true&w=majority')



    console.log("Conectado a la  BD de Mongo Atalas")
   

}
enviroment()




//Rutas que se usarán
app.use("/products",viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts",cartRouter)
app.use("/api/users",userRouter)
