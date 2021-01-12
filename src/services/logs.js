const moment = require('moment')
const elasticClient = require('./elastics')

module.exports = async (log) => {
    const time = moment().format()

    try {        
        await elasticClient().index({
            index: 'logs',
            type: 'logs',          
            body: { ...log, time }       
        })      

    } catch (error) {
        await logs({
            uniquekey: "PANIC!",           
            error,
            success: false,
        })  
    }
}


