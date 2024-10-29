const express = require('express')
const router = express.Router()

const { checkUser } = require('../controllers/user')
const { addProduct, getOneProduct, getAllProducts, addToCart, getonefromCart, getAllFromCart, deleteProduct, buyProduct, getBoughtProducts } = require('../controllers/product')

const procedure = [checkUser, addProduct]
const procedureCart = [checkUser, addToCart]
const procedureDelete = [checkUser, deleteProduct]
const buyProductprocedure = [checkUser, buyProduct]

router.post('/add-product', procedure)
router.post('/buy-product', buyProductprocedure)
router.get('/get-one-product', getOneProduct)
router.get('/get-all-products', getAllProducts)
router.post('/add-to-cart', procedureCart)
router.get('/get-one-product-from-cart', getonefromCart)
router.get('/get-all-products-from-cart', getAllFromCart)
router.delete('/delete-product', procedureDelete)
router.get('/get-bought-product', getBoughtProducts)


module.exports = router
