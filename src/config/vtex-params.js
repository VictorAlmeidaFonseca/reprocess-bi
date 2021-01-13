const moment = require('moment')

module.exports = { 
  "f_creationDate": 
  `creationDate:[${moment(new Date(process.env.START_DATE)).format()} TO ${moment(new Date(process.env.END_DATE)).format()}]`
}
