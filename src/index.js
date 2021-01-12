require('dotenv').config()

const { getAllOrders } = require('./functions/all-orders')
const logs = require('./services/logs')
const parallel = require('./utils/parallel')
const vtexParms = require('./config/vtex-params')
const saveMongo = require('./functions/save-orders-at-mongo')

const run = async () => {
 try {        
    
    await logs({
        uniquekey: "START LIST!",  
    })
    
    const allOrders = await getAllOrders(vtexParms)
      await parallel(allOrders, 100, saveMongo) 

     await logs({
        uniquekey: "START LIST!",
           
     })   
      
    } catch (err) {
        await log({
            uniquekey: orderId,
            success: false,
            error: err || err.message,
        })     
    }
}

module.exports = run