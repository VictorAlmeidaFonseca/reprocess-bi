const moment = require('moment')
const axios = require('axios')

module.exports = async (log) => {
    const time = moment().format()
    const body =  { ...log, time }  

    try {        
        await axios.post(`http://locahost:3001/${logs}`, body)

    } catch (error) {
       console.log(error)
    }
}
