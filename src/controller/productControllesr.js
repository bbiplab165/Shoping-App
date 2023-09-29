const productModel = require("../models/product")


async function createProduct(req, res) {
    try {
        const data = req.body
        const { title, catagory, price, image, description } = data
        const size = {
            S:"Small",
            M:"Medium",
            L:"Large",
            XL:"Extra Large",
            XXL:"Double Extra Large"
        }
        const product={
            title,catagory,description,price,image,size
        }
        if (!title, !catagory, !price, !image, !description) {
            return res.status(404).send({ status: true, message: "Please provide all the fields" })
        }
        await productModel.create(product)
        return res.status(200).send({ status: true, message: "Product created Successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}
async function allProducts(req, res) {
    try {
        const count = req.params.count
        const allProducts = await productModel.find()
        const length = allProducts.length
        const products = await productModel.find().sort({ title: 1 }).skip(count).limit(15)
        return res.status(200).send({ status: true, message: "Products fetched", data: products, length: length })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}

async function filterCatagory(req, res) {
    try {
        const data = await productModel.distinct('catagory');

        return res.status(200).send({ status: true, message: "Products fetched", data: data })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}
async function filterProducts(req, res) {
    try {
        const price = req.params.price;
        const catagory = req.params.catagory;
        if (price === 'all' && catagory !== 'all') {
            const data = await productModel.find({ catagory: catagory })
            return res.status(200).send({ status: true, message: "Products fetched", data: data })
        }
        if (price !== 'all' && catagory === 'all') {
            if (price == '0') {
                const data = await productModel.find({
                    $and: [
                        { price: { $gt: 0 } },
                        { price: { $lt: 1000 } }
                    ]
                })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
            else if (price == '1000') {
                const data = await productModel.find({
                    $and: [
                        { price: { $gt: 999 } },
                        { price: { $lt: 5000 } }
                    ]
                })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
            else if (price == '5000') {
                const data = await productModel.find({ price: { $gt: 4999 } })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
        }
        if (price !== 'all' && catagory !== 'all') {
            if (price == '0') {
                const data = await productModel.find({
                    catagory,
                    $and: [
                        { price: { $gt: 0 } },
                        { price: { $lt: 1000 } }
                    ]
                })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
            else if (price == '1000') {
                const data = await productModel.find({
                    catagory,
                    $and: [
                        { price: { $gt: 999 } },
                        { price: { $lt: 5000 } }
                    ]
                })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
            else if (price == '5000') {
                const data = await productModel.find({ catagory, price: { $gt: 4999 } })
                return res.status(200).send({ status: true, message: "Products fetched", data: data })
            }
        }
        else {
            const data = await productModel.find()
            return res.status(200).send({ status: true, message: "Products fetched", data: data })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}
async function product(req, res) {
    try {
        const id = req.params.id
        const data = await productModel.findById({ _id: id })
        return res.status(200).send({ status: true, message: "Products fetched", data: data })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = { createProduct, allProducts, filterCatagory, filterProducts, product }