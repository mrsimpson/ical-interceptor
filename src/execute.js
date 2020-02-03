const ical = require('ical.js')
const readJcalFromUrl = require('./readJcalFromUrl')
const retrieveEvents = require('./retrieveEvents')
const manipulateEvents = require('./manipulateEvents')

const stripEvents = function(jcal){
    const stripped = new ical.Component(JSON.parse(JSON.stringify(jcal)))
    stripped.removeAllSubcomponents('vevent')
    return stripped
}

const mergeEventsIntoIcs = function(events, jcal){
    const merged = new ical.Component(JSON.parse(JSON.stringify(jcal)))
    events.forEach((event)=> merged.addSubcomponent(event))
    return merged
}

async function execute(url, operations){
    const sourceJcal = await readJcalFromUrl(url)

    const manipulatedEvents = manipulateEvents(retrieveEvents(sourceJcal), operations)

    const mergedJcal = mergeEventsIntoIcs(manipulatedEvents, stripEvents(sourceJcal))

    return mergedJcal.toString()
}

module.exports = execute