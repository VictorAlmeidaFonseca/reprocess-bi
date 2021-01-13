const moment = require('moment')

module.exports = { 
  "start": { 
    "date": `${moment(new Date(process.env.START_DATE)).format()}`
  },
  "end": {
    "date": `${moment(new Date(process.env.END_DATE)).format()}`
  }
}


