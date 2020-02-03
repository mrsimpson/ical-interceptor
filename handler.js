"use strict"

const execute = require('./src/execute')

module.exports = async (event, context) => {
    // console.log('EVENT', JSON.stringify(event, 2, ""))
    // console.log('CONTEXT', JSON.stringify(context, 2, ""))
    const query = event.query
    if (!(query && query.url)) {
        return context
            .fail('Some URL to proxy needs to be supplied as query parameter');
    }
    const operations = {}
    if (query.remindBeforeStart > 0) {
        operations.remindBeforeStart = query.remindBeforeStart
    }
    try {
        const result = await execute(query.url, operations)
        return context
            .status(200)
            .succeed(result);
    } catch (e) {
        return context
            .status(500)
            .fail(e);
    }

}