const express = require('express');
const { productModel } = require('../models/product.model.js');
const router = express.Router();


//Endpoint GET

router.get("/", async (req, res) => {
    try {
        let productList = await productModel.find().lean()
        console.log(productList);
        res.render("index", { productList });
    } catch (error) {
        console.log("Error al obtener los productos:", error);
    }
})




module.exports = router;

