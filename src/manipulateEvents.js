const ical = require('ical.js')

function manipulateEvents(events, operations) {
    const manipulatedEvents = []
    events.forEach(event => {
        if (operations) {
            if (operations.remindBeforeStart) {
                const reminders = Array.isArray(operations.remindBeforeStart)
                    ? operations.remindBeforeStart
                    : new Array(operations.remindBeforeStart.toString())
                reminders.forEach(r => {
                    const alarm = new ical.Component('valarm')
                    alarm.addPropertyWithValue('action', 'DISPLAY')
                    const trigger = alarm.addPropertyWithValue('trigger', `-PT${r}M`)
                    if (operations.reminderDescription) {
                        alarm.addPropertyWithValue('description', operations.reminderDescription)
                    }
                    trigger.setParameter('related', 'START')
                    event.addSubcomponent(alarm)
                })
            }
        }
        manipulatedEvents.push(event)
    })
    return manipulatedEvents
}

module.exports = manipulateEvents