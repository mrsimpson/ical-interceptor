const fs = require('fs')
const path = require('path')

function getValidIcs(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar.ics'))
}

module.exports = {
    getValidIcs
}