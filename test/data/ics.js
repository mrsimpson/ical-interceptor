const fs = require('fs')
const path = require('path')

function getValidCalendar(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar.ics'))
}

function getEmptyCalendar(){
    return fs.readFileSync(path.resolve(__dirname, 'emptyCalendar.ics'))
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
    getValidCalendar,
    getBusyCalendar,
    getEmptyCalendar,
    getFreeCalendar,
    getFreeOrTentativeCalendar
}