const express = require("express")
const app = express()
const path = require("path")
const hbs = require('hbs')

app.use(express.urlencoded({extended:true}))
const userRoute = require('../routes/user.routes');
const viewDir = path.join(__dirname, "../public/frontend/views");
const layoutDir = path.join(__dirname, "../public/frontend/layouts");
const staticDir = path.join(__dirname, "../public/statics");
app.use(express.static(staticDir))
app.set("view engine", "hbs")
app.set('views', viewDir)
hbs.registerPartials(layoutDir)
app.use(userRoute); 

module.exports = app

//app.use(express.json())
