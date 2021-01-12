const vtex = require('../services/vtex-client')
const log = require('../services/logs')


async function getOrderDetails(order) {
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
      
    } catch (error) {
        await log({
            uniquekey: orderId,
            success: false,
            error,
        })
    }
}

module.exports = getOrderDetails