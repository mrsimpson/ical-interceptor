require('should')
const nock = require('nock')
const createMockContext = require('./createMockContext')
const {
    getValidCalendar,
    getFreeOrTentativeCalendar
} = require('./data/ics')
const handler = require('../handler')
const {
    BASE_URL
} = require("./data/constants")

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
    const sourceIcs = getValidCalendar()
    beforeEach(() => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, sourceIcs)

        event = SIMPLE_GET_EVENT
    })

    it('should proxy the URL properly', async () => {
        const result = await handler(event, createMockContext())
        result.code.should.equal(200)
        result.body.should.equal(sourceIcs.toString())
    })

    it('should apply filters', async () => {
        event.query['filter.X-MICROSOFT-CDO-BUSYSTATUS'] = 'FREE,TENTATIVE'
        const result = await handler(event, createMockContext())
        result.code.should.equal(200)
        result.body.should.equal(getFreeOrTentativeCalendar().toString())
    })

    it('should add a CORS header', async () => {
        const result = await handler(event, createMockContext())
        result.headers['Access-Control-Allow-Origin'].should.equal('https://ical.no-panic.org')
    })

    it('should return the content as plain text as default', async () => {
        const result = await handler(event, createMockContext())
        result.headers.should.have.keys('Content-Type')
        result.headers['Content-Type'].should.equal('text/plain')
    })

    it('should return the content as downloadable ics if requested', async () => {
        event.query.download = true
        const result = await handler(event, createMockContext())
        result.headers.should.have.keys('Content-Type')
        result.headers['Content-Type'].should.equal('application/octet-stream')
        result.headers.should.have.keys('Content-Disposition')
        result.headers['Content-Disposition'].should.equal('attachment;filename="validIcs-intercepted.ics"')
    })
})