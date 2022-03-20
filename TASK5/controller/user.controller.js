const db = require("../models/DBconnection")
const { ObjectId } = require("mongodb")

const showAll = (req,res)=>{
        db(async (err, connection) => {
            if (err) res.send(err)
            const users = await connection.collection
            ("user").find().toArray()
            res.render("showAll", {
                pageTitle: "All Users",
                users,
                isEmpty: (users.length == 0) ? true : false
            })
        })
    }
    
const show = (req,res)=>{
        db(async (err, connection) => {
            if (err) res.send(err)
            const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
    
            res.render("show", {
                pageTitle: "User Data",
                user,
                isEmpty: user ? false : true
            })
        })
    }

 const addUser =(req,res)=>{
    res.render("add",{
        pageTitle:"addpage",

    })
}

const addUserlogic = (req,res)=>{
    let user = {
        id: Date.now(),
        name:req.body.name,
        age:req.body.age,
        email:req.body.email
    }
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").insertOne({ ...user })
        // console.log(userData);
        res.redirect("/")
    }) 
} 


const editUser = (req,res)=>{
db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        res.render("edit", {
            pageTitle: "edit",
            user
        })
    })

}


const editUserlogic = (req,res)=>{

    const updateUser = {
        $set: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    }
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").updateOne(
            { _id: new ObjectId(req.params.id) }, updateUser)
        // console.log(userData);
        res.redirect("/")
    })
}

const deleteUser = (req,res)=>{
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").deleteOne({ _id: new ObjectId(req.params.id) })
        // console.log(userData);
        res.redirect("/")
    })
}

//Bank operation


/* const getUser = (UserId)=>{
    const users = deal.readData()
    let i = users.findIndex( user => user.id == UserId )
    return i
} */
const add = (userId, val) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: userId });
        user.operations.push({
            val: val,
            type: "add",
            time: new Date().toLocaleString(),
            remainigBalance: user.remainigBalance + val
        })
        await connection.collection("user").updateOne({ _id: userId }, {
            $set:{
                remainigBalance: user.remainigBalance + val ,
                operations:user.operations
            }
        })
    })
}

const withdraw = (userId, val) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: userId });
            user.operations.push({
            val: val,
            type: "withdraw",
            time: new Date().toLocaleString(),
            remainigBalance: user.remainigBalance - val
        })
        await connection.collection("user").updateOne({ _id: userId }, {
            $set:{
                remainigBalance: user.remainigBalance - val ,
                operations:user.operations
            }
        })
    })
}

const operations = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        res.render("operation", {
            name: user.name
        })
    })
}

const operationslogic = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        if (req.body.operationtype == "add") {
            if (req.body.operationValue > 6000) {
                console.log(("can't add more than 6000 "));
                return res.render("operation", {
                    name: user.name,
                    error: "can't add more than 6000"
                })
            }
           add(new ObjectId(req.params.id), +req.body.operationValue);
        }
        if (req.body.operationtype == "withdraw") {
            if (req.body.operationValue >= user.remainigBalance) {
                console.log(("your remainig Balance don't get enough money"));
                return res.render("operation", {
                    name: user.name,
                    error: "your remainig Balance don't get enough money"
                })
            }
            withdraw(new ObjectId(req.params.id), +req.body.operationValue);
        }

        res.redirect("/")
    })
}

module.exports = { showAll, addUser, editUser, show ,
     deleteUser,addUserlogic ,editUserlogic ,operations , operationslogic }