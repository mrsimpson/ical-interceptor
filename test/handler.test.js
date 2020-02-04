require('should')
const nock = require('nock')
const {
    getValidIcs
} = require('./data/ics')
const handler = require('../handler')
const {
    BASE_URL
} = require("./data/constants")

const CONTEXT = {
    "headerValues": {},
    "cbCalled": 0,
    status: (code) => {
        return {
            succeed: (body) => ({
                body,
                code
            }),
            fail: (message) => message
        }
    }
    // "status": function(status){ return {fail: ()=>({code:300})}},
}

const SIMPLE_GET_EVENT = {
    "body": {},
    "headers": {},
    "method": "GET",
    "query": {
        "url": `${BASE_URL}/validIcs`
    },
    "path": "/"
}

describe('handler', () => {
    let event
    const sourceIcs = getValidIcs()
    beforeEach(() => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, sourceIcs)

        event = SIMPLE_GET_EVENT
    })

    it('should proxy the URL properly', async () => {
        const result = await handler(event, CONTEXT)
        result.code.should.equal(200)
        result.body.should.equal(sourceIcs.toString())
    })
})