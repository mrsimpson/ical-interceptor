"use strict"
require('dotenv')
const execute = require('./src/execute')
const parseQueryParameters = require('./src/parseQueryParameters')

module.exports = async (event, context) => {
    console.log('EVENT', JSON.stringify(event, 2, ""))
    console.log('CONTEXT', JSON.stringify(context, 2, ""))

    const query = parseQueryParameters(event.query)

    if (!(query && query.url)) {
        return context
            .fail('Some URL to proxy needs to be supplied as query parameter');
    }

    // validate the query parameters and propagate the supported ones
    const operations = {}
    if (query.remindBeforeStart > 0) {
        operations.remindBeforeStart = query.remindBeforeStart
    }

    if (query.reminderDescription) {
        operations.reminderDescription = query.reminderDescription
    }

    operations.filter = query.filter

    try {
        const result = await execute(query.url, operations)

        const headers = {
            'Access-Control-Allow-Origin': 'https://ical.no-panic.org'
        }

        return context
            .headers(headers)
            .status(200)
            .succeed(result)
    } catch (e) {
        return context
            .status(500)
            .fail(e)
    }
}