const express = require('express');
const mongoosePaginate = require('mongoose-paginate-v2')
const { productModel } = require('../models/product.model.js');
const router = express.Router();


//Endpoint GET




router.get("/", async (req, res) => {
    try {
        let { limit, page, sort, filtro, category } = req.query
        const options = {
            page: Number(page) || 1,
            limit: Number(limit) || 1,

        }

        if (sort) {
            options.sort = {
                price: Number(sort)
            }
        }

        let filter = filtro ? { category: String(filtro) } : {}




        let result = await productModel.paginate(filter, options)

        const { totalPages, hasNextPage, hasPrevPage, prevPage, nextPage } = result;
        const prevLink = hasPrevPage ? `${req.originalUrl.replace(`page=${page}`, `page=${prevPage}`)}` : null;
        const nextLink = hasNextPage ? `${req.originalUrl.replace(`page=${page}`, `page=${nextPage}`)}` : null;

        res.send({
            status: 'success',
            payload: result.docs, totalPages, prevPage, nextPage, hasNextPage, hasPrevPage, prevLink, nextLink,
        })






    } catch (error) {
        console.log("Error en el producto ingresado")

    }
})

//Endpoint POST

router.post("/", async (req, res) => {
    try {
        let { name, category, price, stock, image } = req.body;
        if (!name || !category || !price || !stock || !image) {
            res.status(400).send("Faltan o hay algún error en los parametros añadidos");
        } else {
            let result = await productModel.create({ name, category, price, stock, image });
            res.send({ result: "success", payload: result });
        }
    } catch (error) {
        console.error("Error al añadir producto");
    }
});

//Endpoint Put

router.put("/:uid", async (req, res) => {
    try {

        let { uid } = req.params
        let productReplace = req.body
        if (!productReplace.name || !productReplace.category || !productReplace.price || !productReplace.stock || !productReplace.image) {
            res.send({ result: "error", error: "le faltan parametros al producto" })
        }
        let result = await productModel.updateOne({ _id: uid }, productReplace)
        res.send({ result: "success", payload: result })
    } catch {

    }
})

//Endpoint Delete

router.delete("/uid", async (req, res) => {
    let { uid } = req.params
    let result = await productModel.deleteOne({ _id: uid })
    res.send({result:"success",payload:result})
})



module.exports = router
