const express=require("express")

const userController=require("../controller/userController")
const productController=require("../controller/productControllesr")

const routes=express.Router()

routes.get("/hello",(req,res)=>{
    res.send({message:"hello"})
})
routes.post("/create",userController.create)
routes.post("/login",userController.login)
routes.post("/createProduct",productController.createProduct)
routes.get("/allProducts/:count",productController.allProducts)
routes.get("/filterCatagory",productController.filterCatagory)
routes.get("/filterProducts/:price/:catagory",productController.filterProducts)
routes.get("/product/:id",productController.product)

module.exports=routes 