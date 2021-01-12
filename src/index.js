
const logs = require('./src/logs')
const allOrder = require('./src/all-orders')
const parallel = require('./utils/parallel')
const vtexParms = require('./config/vtex-params')
const saveMongo = require('./src/save-orders-at-mongo')

const run = async () => {
 try {    
    await logs({
        uniquekey: "START LIST!",
        time: moment().format()
    })           
        
     const orders = await allOrder(vtexParms)      
     await parallel(orders, 100, saveMongo) 

     await logs({
        uniquekey: "START LIST!",
           
     })   
      
    } catch (error) {
        await logs({
            uniquekey: "PANIC!",
            error,
        })        
    }
}

module.exports = run