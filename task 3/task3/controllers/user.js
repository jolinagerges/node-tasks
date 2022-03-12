const chalk = require("chalk")
const dealWithJson = require("./dealWithJson")
const findMyUserIndex = (users, key, val)=>{
    let i = users.findIndex( user => user[key] == val )
    return i
}
const addUser = (userData) =>{
    try{
        if(userData.name.length<3) throw new Error("invalid name")
        const users = dealWithJson.readData()
        userData = { accnum:Date.now() ,...userData , remainigBalance : userData.intialBalance , operation:[] }
        
        users.push(userData)
        dealWithJson.writeData(users)
        console.log(chalk.green("user Added"))    
    }
    catch(e){
        console.log(chalk.red(e.message))
    }}

    module.exports = {addUser}