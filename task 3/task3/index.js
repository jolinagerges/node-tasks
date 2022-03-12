const Bank = require("./controllers/Bank")
const user = require("./controllers/user")
const yargs = require("yargs")
yargs.command({
    command:"addUser",
    describe:"used for adding users",
    builder:{
        name:{
            type:String,
            required:true
        },
         intialBalance:{
            type:Number,
            required:true
        },
    },
    handler:function(argv){
        let userData = {
            name:argv.name,
            intialBalance:argv.intialBalance 
        }
        user.addUser(userData)
    }
})

yargs.command({
    command:"operation",
    describe:"used for adding users",
    builder:{
        userid :{
            type:Number,
            required:true
        },
         value:{
            type:Number,
            required:true
        },
         type:{
            type:String,
            required:true
        },
    },
    handler:function(argv){
        Bank.operation(argv.userid , argv.value , argv.type)
        
    }
})

yargs.argv