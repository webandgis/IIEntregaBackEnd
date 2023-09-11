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

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


//conectar a base de datos mongoose

const enviroment = async () => {

    await mongoose.connect('mongodb+srv://girmar14:d1CYrI8pl75TyQw5@e-commerce.s0glbx3.mongodb.net/?retryWrites=true&w=majority')



    //Insertar Productos

    /* let result= await productModel.insertMany([
     {name: "Hummus de espinaca", category: "vegano",price:250, stock:30,image: "https://1.bp.blogspot.com/-TWAIwg2yV50/W00IkhYrxHI/AAAAAAAAQB8/GHFjmhm8TUg3mmoHmEYRzDa2pCrfLuWpgCLcBGAs/s1600/Hummus-de-espinacas-1.jpg"},
     {name: "Hummus de remolacha", category: "vegano",price:300, stock:15,image: "https://comeviveviaja.com/wp-content/uploads/2020/05/Hummus-de-alubias-blancas-y-remolacha.-Super-cremoso-768x1024.jpg"},
     {name: "Hummus de zanahoria", category: "vegano",price:300, stock:45,image: "https://www.gourmet.cl/wp-content/uploads/2020/06/foto-hummus-de-zanahoria-tama%C3%B1o-sitio-web.jpg"},
     {name: "Hummus de queso Feta", category: "vegetariano",price:500, stock:30,image: "https://www.nomecomesnada.es/wp-content/uploads/2023/06/hummus-queso-feta-4.jpg"},
     {name: "Hummus de tomates cherrys", category: "vegetariano",price:500, stock:15,image: "https://i.blogs.es/2389e4/hummus-tomates-cherry-asados-pakus-futurobloguero-dap/1366_2000.jpg"}


    ]) */

    //Insertar Usuarios

    /*  let result=await userModel.insertMany([
         {first_name:"Girmar",last_name:"Laucho", email:"girmar@email.com",phone: 234773, address: "calle 3 con av 7"},
         {first_name: "Kala",last_name:"Pietro",email:"kalape@email.com",phone: 234778,address:"calle 2 con av 6"},
         {first_name:"Natalia",last_name:"Bermudez",email:"natalia@email.com",phone:234234,address:"calle 2 con av 4"}
     ]) */

    //Agrupar elementos usando match,group

   /*  let productOrder = await productModel.aggregate([
        { $match: { category: "vegano", } },
        { $group: { _id: "$name", totalQuantity: { $sum: "$stock" } } },
        { $sort: { totalQuantity: -1 } },
        { $group: { _id: 1, orders: { $push: "$$ROOT" } } },
        {$project:{
            "_id":0,
            orders:"$orders"
        }},
        {$merge:{
            into:"reports"
        }}
    ]) */

    //Paginate products
  /*   let product= await productModel.paginate({category:"vegano"},{limit:2,page:2}) */

    console.log("Conectado a la  BD de Mongo Atalas")
   

}
enviroment()

//Render handlebars


//Rutas que se usarán
app.use("/products",viewRouter)
app.use("/api/products", productRouter)
app.use("/api/carts",cartRouter)
app.use("/api/users",userRouter)
