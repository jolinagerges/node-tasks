const {MongoClient} = require("mongodb")

const dbUrl = "mongodb://127.0.0.1:27017"


const database = "bankData"

const connec = (callback)=>{
    MongoClient.connect(dbUrl,{},(err,result)=>{
        if(err) return callback(err,false)
        const summ = result.db(database)
        callback(false,summ)
    })
}  


module.exports = connec