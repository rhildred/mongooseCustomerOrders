// initialize express

const express = require("express");
const app = express();
app.use(express.static("public"));

// use form code

app.use(express.urlencoded({extended: false}));

// initialize ejs

app.set("views", "views");
app.set("view engine", "ejs");

// initialize mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1:27017/Richard";
mongoose.connect(mongoDB);
const Receipt = mongoose.model("Receipt",{
    customer_name: String
});


// setup some routes

// initial form
app.get("/", async (req, res)=>{
    res.render("index");
});

// receipt page when the form is submitted ... saves "order"
app.post("/receipt", async (req, res) =>{
    const receipt = new Receipt({customer_name:req.body.customer_name});
    await receipt.save();
    res.render("receipt", {receipt});
});

// list of all orders
app.get("/orders", async (req, res)=>{
    const orders = await Receipt.find({});
    res.render("orders", {orders});
});

// start server

const server = app.listen(8080, ()=>{
    console.log(`server listening http://localhost:${server.address().port}`);
});