const chalk = require("chalk")
const dealWithJson = require("./dealWithJson")
const user = require("./user")

let users = dealWithJson.readData()
const getindex = (accnum)=>{
    let i = users.findIndex((user)=> {
      return user.accnum == accnum
    })
return i 
}
const Add = (accnum , value)=> { 
    let i = getindex(accnum)
    if (value<6000){
        users[i].remainigBalance += value
        console.log("balance now:" +   users[i].remainigBalance)
        users[i].operation.push({value:value , typeofoperation:"add" ,
         currentbalance : users[i].remainigBalance  })
        dealWithJson.writeData(users)
    console.log(users[i].operation)
    } 
    else {console.log("not allowed")}
}

const withdraw = (accnum , value)=> { 
    let i = getindex(accnum)
    if (value <= users[i].remainigBalance)
    {
        users[i].remainigBalance -= value
        console.log("balance now:" +   users[i].remainigBalance)

        users[i].operation.push({value:value , typeofoperation:"withdraw" ,
        currentbalance : users[i].remainigBalance
       })
       dealWithJson.writeData(users)
       console.log(users[i].operation)
    }
    else {console.log("more than your current money")}
}

const operation = (accnum , value , type)=> {
    let i = getindex(accnum)

    if (i == -1){
      return console.log( "id not found")}
      if (type != "add" &&
      type != "withdraw"){
 return console.log ("not allowed")
      }
    if (type == "add"){
        Add(accnum , value)
    }
if (type == "withdraw"){
    withdraw(accnum , value)
}

}
module.exports = {operation}