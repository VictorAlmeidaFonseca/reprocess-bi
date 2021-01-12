const elastic = require('elasticsearch')

module.exports = () => {
    const client = new elastic.Client({
        host : `${process.env.ELASTIC_HOST}:${process.env.ELASTIC_PORT}`,
        log : 'trace'
    })
    return client
}