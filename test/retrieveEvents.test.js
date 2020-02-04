require('should')
const nock = require('nock')
const readIcsFromUrl = require('../src/readJcalFromUrl')
const retrieveEvents = require('../src/retrieveEvents')
const {
    getValidCalendar
} = require('./data/ics')

const BASE_URL = 'http://source.ics'

describe('retrieveEvents', () => {
    it('should identify all events properly', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, getValidCalendar())
        const ics = await readIcsFromUrl(`${BASE_URL}/validIcs`)
        const events = await retrieveEvents(ics)
        events.length.should.equal(3)
    })
})