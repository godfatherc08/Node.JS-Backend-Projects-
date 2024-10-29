
const mongoose = require('mongoose')

const product = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    sellerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productDescription:{
        type: String,
        required: true
    },
    productPrice:{
        type:Number,
        required: true
    }
},
{timestamps: true}
)

const sold = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    accountNumber : {
        type: Number,
        required: true
    },
    buyerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    productPrice:{
        type:Number,
        required: true
    }
},
{timestamps: true}
)


const cart = new mongoose.Schema({
    productID: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    productName:{
        type: String,
        required: true
    }
},
{timestamps: true}
)


const Product = mongoose.model("Product", product)
const Cart = mongoose.model('Cart', cart)
const Sold = mongoose.model('Sold', sold)
module.exports = { Product, Cart, Sold }