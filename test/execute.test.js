require('should')
const nock = require('nock')
const {
    getValidCalendar,
    getBusyCalendar,
    getEmptyCalendar,
    getFreeCalendar,
    getFreeOrTentativeCalendar
} = require('./data/ics')
const execute = require('../src/execute')

const BASE_URL = require('./data/constants').BASE_URL

describe('execute', () => {
    const sourceIcs = getValidCalendar()
    beforeEach(() => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, sourceIcs)
    })
    it('should return the same ICS if no manipulations were requested', async () => {
        const newIcs = await execute(`${BASE_URL}/validIcs`)
        newIcs.should.equal(sourceIcs.toString())
    })

    it('should add a reminder 15mins before start', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            remindBeforeStart: 15
        })
        ics.should.match(/(BEGIN:VEVENT.*BEGIN:VALARM.*TRIGGER;RELATED=START:-PT15M.*END:VALARM.*END:VEVENT.*){3}/s)
    })


    it('should filter events case insensitively', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            'filter': {
                'X-MICROSOFT-CDO-BUSYSTATUS': 'busy'
            }
        })

        ics.should.equal(getBusyCalendar().toString())
    })
    it('should combine multiple filters on the same attribute with OR', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            'filter': {
                'X-MICROSOFT-CDO-BUSYSTATUS': ['FREE', 'TENTATIVE']
            }
        })

        ics.should.equal(getFreeOrTentativeCalendar().toString())
    })

    it('should combine multiple filters on the different attribute with AND', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            'filter': {
                'X-MICROSOFT-CDO-BUSYSTATUS': ['FREE', 'TENTATIVE'],
                'summary': 'frei'
            }
        })

        ics.should.equal(getFreeCalendar().toString())
    })

    it('should filter on start time', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            'filter': {
                'DTSTART': '.*T\\d{2}45\\d{2}$',
            }
        })
        ics.should.equal(getBusyCalendar().toString())
    })

    it('should filter everything if a non-matching filter is set', async () => {
        const ics = await execute(`${BASE_URL}/validIcs`, {
            'filter': {
                'SOMETHING': 'NOT EXISTING',
            }
        })
        ics.should.equal(getEmptyCalendar().toString())
    })
})