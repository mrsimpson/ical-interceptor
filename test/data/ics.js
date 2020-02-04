const fs = require('fs')
const path = require('path')

function getValidIcs(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar.ics'))
}

function getBusyCalendar(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar-busy.ics'))
}

function getFreeCalendar(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar-free.ics'))
}

function getFreeOrTentativeCalendar(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar-freeOrTentative.ics'))
}

module.exports = {
    getValidIcs,
    getBusyCalendar,
    getFreeCalendar,
    getFreeOrTentativeCalendar
}