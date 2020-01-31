import uuidv1 from 'uuid/v1'
export default function manipulateEvents(events, operations) {
    const manipulatedEvents = []
    events.forEach(event => {
        if (operations) {
            if (operations.remindBeforeStart) {
                const alarm = {
                    "type": "VALARM",
                    "params": [],
                    "action": "DISPLAY",
                    "trigger": {
                        "params": {
                            "RELATED": "START"
                        },
                        "val": `-PT${operations.remindBeforeStart}M`
                    }
                }
                event[uuidv1()] = alarm
            }
            manipulatedEvents.push(event)
        }
    })
    return manipulatedEvents
}