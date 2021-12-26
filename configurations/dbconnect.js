const mongoose = require('mongoose')

function DBIsConnected(){
    try {

        mongoose.connect(
            process.env.DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, 
            (err) => {
                if(err){
                    console.log(err)
                }else{
                    console.log("Database Connected")
                }
            }
        ) 
            
    } catch (error) {
        console.log(error)
    }
}
module.exports =  DBIsConnected