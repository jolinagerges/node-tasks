const { request } = require("../app/BankApp")
const deal = require("../helpers/dealWithJson")
const users = deal.readData()

const showAll = (req,res)=>{
    
    res.render("showall", {
        pageTitle:"All Users",
        users,
        isEmpty: users.length==0 ? true : false  // []
    })
}
const show = (req,res)=>{
    let userId = req.params.id
    const allUsers = deal.readData()
    let user = allUsers.find(u=> u.id == userId)
    res.render("show", {
        pageTitle:"User Data",
        user,
        isEmpty: user? false : true // x? true : false
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
        let data = deal.readData()
        data.push(user)
        deal.writeData(data)
        res.redirect("/")
    
    
}

const editUser = (req,res)=>{
    const userID = req.params.id;
    var i = users.findIndex( u=> u.id == userID);
    res.render("edit", {
        pageTitle:"Edit User"
        ,user:users[i]
    })
}

const editUserlogic = (req,res)=>{
    const users = deal.readData();
    const userID = req.params.id;
    var i = users.findIndex( u=> u.id == userID);
    users[i] = {
        id: +userID,
        name :req.body.name,
        age :req.body.age,
        email :req.body.email,
        //intialBalance : +users[i].intialBalance,
        //remainigBalance : +users[i].remainigBalance,
        //opt : users[i].opt
    }
        deal.writeData(users)
        res.redirect("/")
    }
    
const deleteUser = (req,res)=>{
    let userId = req.params.id
    const users = deal.readData()
    let data = users.filter(u=> u.id!=userId)
    deal.writeData(data)
    res.redirect("/")
}

//Bank operation


const getUser = (UserId)=>{
    const users = deal.readData()
    let i = users.findIndex( user => user.id == UserId )
    return i
}

const add = (userId, val) => {
    const users = deal.readData()

    let i = getUser(userId);
    if (val < 6000) {      
        users[i].remainigBalance += val;
        console.log("Current balance \n" + users[i].remainigBalance);
    } else {
        console.log("can't add more than 6000 ");
    }
}
const withdraw = (userId, val) => {
    const users = deal.readData()
    let i = getUser(userId);
    if (val <= users[i].remainigBalance) {
        users[i].remainigBalance -= val;
        console.log("Current balance \n" + users[i].remainigBalance);
    } else {
        console.log("not enough money");
    }
}

const operations =(req, res)=>{
    const users = deal.readData()
    let i = getUser(req.params.id);
    res.render("operation" , {
        name:users[i].name
    })
}

const operationslogic =(req , res)=>{
    const users = deal.readData()
        let i = getUser(req.params.id); 
        
        if (req.body.operationtype == "add") {
            if(req.body.operationValue > 6000){
                console.log(("can't add more than 6000 "));
               return res.send("can't add more than 6000 ")
            }
            add(req.params.id , +req.body.operationValue);
        }
        if (req.body.operationtype == "withdraw") {
            if (req.body.operationValue >= users[i].remainigBalance){
                console.log(("not enough money"));
                return  res.send("not enough money")
            }
            withdraw(req.params.id, +req.body.operationValue);
        }
        if(!users[i].operations){
            users[i].operations=[]
        }
        users[i].operations.push({
            val: +req.body.operationValue ,
            type: req.body.operationtype ,
            time : new Date() ,
            remainigBalance : users[i].remainigBalance
        })
        deal.writeData(users);
        console.log(users[i].operations);
        res.redirect("/")

}



module.exports = { showAll, addUser, editUser, show ,
     deleteUser,addUserlogic ,editUserlogic ,operations , operationslogic }