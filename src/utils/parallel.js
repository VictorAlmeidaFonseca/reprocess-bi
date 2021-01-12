const { chunk } = require('lodash');

module.exports = async (array, executions, callback) => {
    const chunks = chunk(array, executions);

    for (const chunk of chunks) {
        const promises = [];
        chunk.forEach(item => promises.push(callback(item)));
        await Promise.all(promises);        
       
    }
}