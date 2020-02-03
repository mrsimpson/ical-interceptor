const ical = require('ical.js')

function manipulateEvents(events, operations) {
    const manipulatedEvents = []
    events.forEach(event => {
        if (operations) {
            if (operations.remindBeforeStart) {
                const alarm = new ical.Component('valarm')
                alarm.addPropertyWithValue('action', 'DISPLAY')
                const trigger = alarm.addPropertyWithValue('trigger', `-PT${operations.remindBeforeStart}M`)
                if(operations.reminderDescription){
                    alarm.addPropertyWithValue('description', operations.reminderDescription)
                }
                trigger.setParameter('related', 'START')
                // trigger.
                // const alarm = {
                //     "type": "VALARM",
                //     "params": [],
                //     "action": "DISPLAY",
                //     "trigger": {
                //         "params": {
                //             "RELATED": "START"
                //         },
                //         "val": `-PT${operations.remindBeforeStart}M`
                //     }
                // }
                // alarm.setValue(`ACTION:DISPLAY\nTRIGGER;RELATED=START:-PT${operations.remindBeforeStart}M\nDESCRIPTION:Reminder`)
                // alarm.setValue({
                //     ACTION:"DISPLAY", 
                //     TRIGGER: {
                //         RELATED=START:-PT${operations.remindBeforeStart}M\nDESCRIPTION:Reminder`)
                // event.addProperty(alarm)
                event.addSubcomponent(alarm)
            }
        }
        manipulatedEvents.push(event)
    })
    return manipulatedEvents
}

module.exports = manipulateEvents