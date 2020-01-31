export default function retrieveEvents(ics) {
    const events = []
    for (const prop in ics) {
        if (ics.hasOwnProperty(prop) && ics[prop].type === 'VEVENT') {
            events.push(ics[prop])
        }
    }
    return events
}