const log = require('../services/logs')
const { vtexOrderDetails } = require('./all-orders')
const encrypt = require('./encrypt-fields')
const updateDateFields = require('./parse-date')
const { MongoClient } = require('mongodb')

const uri = `${process.env.MONGO_URI}`
const options = { useNewUrlParser : true , useUnifiedTopology: true}
const dbClient = new MongoClient(uri, options)

async function saveMongo(order){
    const { orderId } = order 
    let uniquekey = orderId
    let orderDetails

    try {      
      await dbClient.connect()
      const db = dbClient.db(`${process.env.MONGO_DB}`)
      const orders = db.collection(`${process.env.MONGO_COLLECTION}`)
 
      const filter = { orderId }
      orderDetails = await orders.findOne(filter)
      
      if(!orderDetails.length) {
        orderDetails = vtexOrderDetails(orderId)
        const parsed = updateDateFields(orderDetails)
        const encrypted = encrypt(parsed)
        await orders.insertOne(encrypted)
      }      
      
      const orderDetailsParsedDate = updateDateFields(orderDetails)
      const encrypted = encrypt(orderDetailsParsedDate)
      
      const updateDoc = {
        ...encrypted,
        kibana: false
      }
   
      const updateOrder = await orders.updateOne(filter, updateDoc)
      
      await log({
        uniquekey,
        success: true,     
        data: updateOrder
     })
        
    } catch (err) {
      await log({
        uniquekey: orderId,
        success: false,
        error: err || err.message,
    })
    }
}

module.exports = saveMongo