const express = require('express')
const router = express.Router();
const { cartModel } = require('../models/cart.model.js')
const { productModel } = require('../models/product.model.js');


//endoint get
router.get("/", async (req, res) => {
  try {

    let result = await cartModel.find()
    res.send({ result: "success", payload: result })

  } catch (error) {
    console.log("Error en el carrito consultado")
  }
})

//endoint get byId
router.get("/cid", async (req, res) => {
  try {

    let { cid } = req.params
    let result = await cartModel.findById(cid)
    res.send({ result: "succes", payload: result })

  } catch (error) {
    console.error("Error al seleccionar carrito por id")

  }
})

//post Cart 

router.post("/", async (req, res) => {
  const { obj } = req.body;

  if (!Array.isArray(obj)) {
    return res.status(400).json({ error: "El objeto debe ser un array" });
  }

  try {

    const productIds = obj.map((product) => product._id);
    const validProducts = await productModel.find({ _id: { $in: productIds } })


    const cartProducts = validProducts.map((product) => ({
      _id: product._id,
      quantity: 1,
    }));


    let result = await cartModel.create({ product: cartProducts })
    res.send({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al crear el carrito", error);

  }
});



//Endpoin cantidad de un producto en el carrito

router.post("/:cid/product/:uid", async (req, res) => {
  const { cid, uid } = req.params
  const { quantity } = req.body

  try {

    const validProdId = await productModel.findById(uid)
    if (!validProdId) {
      res.status("Error,producto no encontrado")
    }

    const validCart = await cartModel.findById(cid)

    if (!validCart) {
      res.status("Error,carrito no encontrado")
    }

    const cartProduct = validCart.product.find((item) => item._id.toString() === uid);
    if (cartProduct) {
      cartProduct.quantity = quantity;
    } else {
      return res.status(404).json({ error: "Product not found in cart" });
    }
let result = await validCart.save();
    res.send({ result: "success", payload: result });
  

  } catch (error) {
    console.log("Error al añadir producto por id")
  }

})

//Enpoint put 

router.put("/:cid", async (req, res) => {
  try {

    const { cid } = req.params
    const { product } = req.body

    await cartModel.updateOne(
      { _id: cid },
      { product }
    )

    let result = await cartModel.findOne({ _id: cid })

    res.send({ result: "success", payload: result })
  } catch (error) {
    console.error("Error al actualizar carrito")
  }
})

//delete endpoint
router.delete("/:cid/product/:uid", async (req, res) => {
  try {
    const { cid, uid } = req.params;

    const checkIdProduct = await productModel.findById(uid);
    if (!checkIdProduct) {
     console.log("Error al validar producto")
    }

    const checkIdCart = await cartModel.findById(cid);
    if (!checkIdCart) {
     console.log("error al validar carrito")
    }

    const findProductIndex = checkIdCart.product.findIndex((product) => product._id.toString() === uid);

    if (findProductIndex === -1) {
      return res.status(404).send({ status: 'error', message: "Error al buscar el indice del producto"});
    }

    checkIdCart.product.splice(findProductIndex, 1);

    let result= await checkIdCart.save();

    res.send({ result: "success" ,payload:result});
  } catch (error) {
    
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});



router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const validCart = await cartModel.findById(cid);

    if (!validCart) {
     console.log("error al validar carrito")
    }

    if (validCart.product.length === 0) {
console.log("El carrito ya está vacío")   
 }

    validCart.product = [];

  
    const result = await validCart.save();

    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error deleting cart:", error);
  }
});









module.exports = router
