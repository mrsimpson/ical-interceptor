const ical = require('ical.js')

function retrieveEvents(jcal) {
    const component = new ical.Component(jcal)
    const events = component.getAllSubcomponents('vevent')
    return events
}
module.exports = retrieveEvents