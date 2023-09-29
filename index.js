const express=require("express")
const mongoose=require("mongoose")
const cors = require('cors');

const routes=require("./src/routes/routes")

const app=express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    allowCredentials: true,
}));
app.use('/',routes)

mongoose.connect("mongodb+srv://bbiplab165:MICROMAx1@project1.9vdqmth.mongodb.net/shop_project")
.then(res=>{
    console.log("mongoodb connrcted")
    app.listen(3000,()=>{
        console.log("app connected to port 3000");
    })
})
.catch(err=>{
    console.log(err); 
})


