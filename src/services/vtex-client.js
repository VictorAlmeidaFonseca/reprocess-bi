const vtexClient = require('template-vtex')

module.exports = new vtexClient(
    `${process.env.VTEX_ACCOUNTNAME}`, 
    `${process.env.VTEX_KEY}`,
    `${process.env.VTEX_TOKEN}`
)