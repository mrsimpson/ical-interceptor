function filterEvents(events, filter = {}) {
    const filtered = []

    events.forEach(event => {
        let eventAccepted = true
        for (f in filter) {
            if (filter.hasOwnProperty(f)) {
                let stringified
                // we need to handle properties and components alike - but with lightly different APIs
                const component = event.getFirstSubcomponent(f.toLowerCase())
                if (component) {
                    stringified = component.toString()
                } else {
                    const property = event.getFirstProperty(f.toLowerCase())
                    if (property) {
                        stringified = property.toICALString()
                    }
                }
                stringified = stringified.replace(`${f}:`, '')
                if (stringified) {
                    const orConditions = Array.isArray(filter[f]) ?
                        filter[f] :
                        new Array(filter[f])
                    const matched = orConditions.reduce((total, orCondition) => {
                        return total || !!stringified.match(new RegExp(orCondition, 'i'))
                    }, false)
                    eventAccepted = eventAccepted && matched
                }
            }
        }
        if(eventAccepted){
            filtered.push(event)
        }
    })
    return filtered
}

module.exports = filterEvents