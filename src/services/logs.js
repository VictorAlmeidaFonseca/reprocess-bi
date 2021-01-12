const elasticClient = require('./elastics')

module.exports = async (body) => {
    try {        
        await elasticClient().index({
            index: 'logs',
            type: 'logs',          
            body        
        })      

    } catch (error) {
        await logs({
            uniquekey: "PANIC!",
            time: moment().format(),
            error,
        })  
    }
}


