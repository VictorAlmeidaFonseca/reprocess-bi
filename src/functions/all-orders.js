const vtex = require('../services/vtex-client')
const log = require('../services/logs')

async function getAllOrders(params){
    try {

        const allOrders = await vtex.Order.paginateLists(params)
        await log({
            uniquekey,
            success: true,     
        })

        return allOrders
    } catch (err) {
         await log({
            uniquekey: 'all orders',
            success: false,
            error: err || err.message,
        })
    }

}


async function vtexOrderDetails(order) {
    const { orderId } = order

    try {
      const orderDetails = await vtex.Order.getById(orderId)     
     
      await log({ 
          uniquekey: orderId, 
          success: true, 
          data: 
          orderDetails, 
      })
      
      return orderDetails
      
    } catch (err) {
        await log({
            uniquekey: orderId,
            success: false,
            error: err || err.message,
        })
    }
}

module.exports =  { vtexOrderDetails, getAllOrders }