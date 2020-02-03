const should = require('should')
const nock = require('nock')
const {
    getValidIcs
} = require('./data/ics')
const execute = require('../src/execute')
const retrieveEvents = require('../src/retrieveEvents')

const BASE_URL = 'http://source.ics'

describe('End-to-End', () => {
    const sourceIcs = getValidIcs()
    it('should return the same ICS if no manipulations were requested', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, sourceIcs)

        const newIcs = await execute(`${BASE_URL}/validIcs`)

        newIcs.should.equal(sourceIcs.toString())
    })

    it('should add a reminder 15mins before start', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, getValidIcs())

        const ics = await execute(`${BASE_URL}/validIcs`, {
            remindBeforeStart: 15
        })

        ics.should.match(/(BEGIN:VEVENT.*BEGIN:VALARM.*TRIGGER;RELATED=START:-PT15M.*END:VALARM.*END:VEVENT.*){2}/s)
    })
})