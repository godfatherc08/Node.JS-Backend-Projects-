
const { Product, Cart, Sold } = require('../models/products')
const User = require('../models/user')
const secretKey = "sui1d23kf29g382fgojmsxb ;kwnd'pwdb"
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")



const addProduct = async(req, res) => {
    try{
    const authenticationToken = req.cookies.authenticationToken
    const body = req.body
    const decoded = jwt.verify(authenticationToken, secretKey)

    const sellerID = decoded.ID

    const newProduct = new Product({
        productName: body.productName,
        sellerID: sellerID,
        productDescription: body.productDescription,
        productPrice: body.productPrice
    })

    await newProduct.save()
    .then(() => {
        const token = jwt.sign({productID: newProduct._id }, secretKey, {expiresIn : '2h'}) 
        res.cookie('productToken', token, { httpOnly: true, secure:false, samesite:'lax',maxAge:24*60*60*1000 })
    })
    console.log(newProduct)
    return res.status(200).send("Product Created Succesfully")
}
   catch(err){
    console.log(err)
    return res.status(404).send("Unexpected error")
   }
}



const getOneProduct = async(req, res) => {
    const body = req.body
    const productName = body.productName
    try{
        const product = await Product.findOne({ productName })
        if(product){   
            res.json(product)
}
        else{
            res.send("That product does not exist")
   }
}
   catch(err){
        console.log(err)
   }
}



const getAllProducts = async (req, res) => {
    const products = await Product.find({  })
    res.status(200).json(products)
}

const addToCart = async (req, res) => {
    const { productName } = req.body
    const productToken = req.cookies.productToken

    try{
        const decoded = jwt.verify(productToken, secretKey)
        const productID = decoded.productID
         
        const product = await Product.findOne({ productName })

        if(product){
            if(product._id == productID){
                const cartObject = new Cart ({
                    productID: product._id,
                    productName: productName
                })

                await cartObject.save()
                
                console.log(cartObject)
                return res.status(200).send("Product has been added to cart successfully")
            }
            else{
                return res.send("Wrong Credentials")
            }
        }
        else{
            res.send("Wrong Credentials")
        }
    }
    catch(err){
        console.log(err)
    }
}

const getonefromCart = async (req, res) => {
    const body = req.body
    const productName = body.productName
    try{
        const cartObject = await Cart.find({ productName })
        if(cartObject){   
            res.json(cartObject)
}
        else{
            res.send("That product does not exist in your cart")
   }
}
   catch(err){
        console.log(err)
   }
}

const getAllFromCart = async (req, res) => {
    const cartObjects = await Cart.find({  })
    res.status(200).json(cartObjects)
}


const buyProduct = async(req, res) => {
    const body = req.body
    const productName = body.productName
    const emailAddress = body.emailAddress
    const accountNumber = body.accountNumber
    const password = body.password

    try{
        const product = await Product.findOne({ productName })
        const user = await User.findOne({ emailAddress })

        if(product && user){   
            const check = bcrypt.compareSync(password, user.password)
            if(check){
                 const sold = new Sold({
                    productName: product.productName,
                    accountNumber: accountNumber,
                    buyerID: user._id,
                    productPrice: product.productPrice
                 })
                 await sold.save()
                 res.status(200).send("You have been debited")
            }
}
        else{
            res.send("That product does not exist")
   }
}
   catch(err){
        console.log(err)
   }
}

const getBoughtProducts = async(req, res) => {
    const body = req.body
    const authenticationToken = req.cookies.authenticationToken
    const decoded = jwt.verify(authenticationToken, secretKey)
    const emailAddress = decoded.emailAddress
    

    const user = await User.findOne({ emailAddress })
    if(user){
    const buyerID = user._id
    const boughtProduct = await Sold.findOne({ buyerID })
    if(boughtProduct){
        res.status(200).json(boughtProduct)
    }
    else{
        res.send("No bought products")
    }
    }else{
        res.send("Wrong credentials")
    }
    // Find user and then use buyerID  : user._id
}

const deleteProduct = async(req,res) => {
    const authenticationToken = req.cookies.authenticationToken
    const productToken = req.cookies.productToken
    const { productName } = req.body
    const decoded = jwt.verify(authenticationToken, secretKey)
    const emailAddress = decoded.emailAddress
    try{
        const savedProduct = await Product.findOne({ productName })
        const savedUser = await User.findOne({ emailAddress })

        const decoded2 = jwt.verify(productToken, secretKey)
        const productID = decoded2.productID
        if (savedUser){
            if(savedProduct && savedProduct._id == productID){
                await Product.findByIdAndDelete(productID)
                res.clearCookie('productToken')
                return res.status(200).send('Product Deleted')
            }
            else{
                res.send('Wrong credentials')
            }
        }
        else{
               res.send("Login again")
        }
    }
    catch(err){
        res.status(404).send(err)
    }
}



module.exports = { addProduct, getOneProduct, getAllProducts, addToCart, getonefromCart, getAllFromCart, deleteProduct, buyProduct, getBoughtProducts }