const should = require('should')
const nock = require('nock')
const {
    getValidIcs
} = require('./data/ics')
const handler = require('../handler')
const {
    BASE_URL
} = require("./data/constants")


describe('handler', () => {
    it('should proxy the URL properly', async () => {
        const sourceIcs = getValidIcs()
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, sourceIcs)

        const event = {
            "body": {},
            "headers": {},
            "method": "GET",
            "query": {
                "url": `${BASE_URL}/validIcs`
            },
            "path": "/"
        }

        const context = {
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

        const result = await handler(event, context)

        result.code.should.equal(200)
        result.body.should.equal(sourceIcs.toString())

    })
})