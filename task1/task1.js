
const customer = document.querySelector("#customer info") ;
const  tableBody = document.querySelector("#tableBody") ;
const info =['name' , 'intial balance' , 'adress'] ;

const save = (name,data)=> 
{localStorage.setItem(name,JSON.stringify(data))}

const read = ( name ) => {
    let data 
    try{
        data = JSON.parse(localStorage.getItem(name)) 
        if (!Array.isArray(data)) throw new Error (" is not array") }
        
catch(e) {
    data=[]
}
    
return data   
}

    const formSubmit = function(e){
        e.preventDefault()
        let user = {accnum :Date.now(), creatdat : new Date()} 
        info.forEach(user => user[data]= this.elements[user].value )
        const users = read("users")
        .push(user)
        save ("users")
        this.reset()
        window.location.href=""
    }