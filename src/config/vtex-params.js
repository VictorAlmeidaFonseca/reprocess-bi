const moment = require('moment')

module.exports = { 
  "f_creationDate": 
  `creationDate:[${moment(process.env.START_DATE).format()} TO ${moment(process.env.END_DATE).format()}]`
}
