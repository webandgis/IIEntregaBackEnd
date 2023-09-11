const mongoose = require('mongoose');
const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    product: [{
        _id: {
            type: mongoose.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]

});

cartSchema.pre('find', function (next) {
    this.populate('product._id');
    next();
});

const cartModel = mongoose.model(cartCollection, cartSchema);
module.exports = { cartModel };
