import {
    async as ical
} from 'node-ical'
import readIcsFromUrl from './readIcsFromUrl'
import retrieveEvents from './retrieveEvents'
import manipulateEvents from './manipulateEvents'

const stripEvents = function(ics){
    const stripped = {}
    for (const prop in ics) {
        if (ics.hasOwnProperty(prop) && ics[prop].type !== 'VEVENT') {
            stripped[prop] = ics[prop]
        }
    }
    return stripped
}

const mergeEventsIntoIcs = function(events, ics){
    const merged = Object.assign({}, ics)
    events.forEach((event)=> merged[event.uid] = event)
    return merged
}

export default async function execute(url, operations){
    const sourceIcs = await readIcsFromUrl(url)

    const manipulatedEvents = manipulateEvents(retrieveEvents(sourceIcs), operations)

    return mergeEventsIntoIcs(manipulatedEvents, stripEvents(sourceIcs))
}