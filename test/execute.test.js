import should from 'should'
import nock from 'nock'
import {
    getValidIcs
} from './data/ics'
import execute from '../src/execute'
import retrieveEvents from '../src/retrieveEvents'

const BASE_URL = 'http://source.ics'

describe('End-to-End', () => {
    it('should return the same ICS if no manipulations were requested', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, getValidIcs())

        const ics = await execute(`${BASE_URL}/validIcs`)

        ics.should.not.be.empty()
    })

    it('should add a reminder 15mins before start', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, getValidIcs())

        const ics = await execute(`${BASE_URL}/validIcs`, {
            remindBeforeStart: 15
        })

        const events = retrieveEvents(ics)
        events.forEach((event) => {
            let alarmFound = false
            let alarmTime = ''
            for (const prop in event) {
                if (event[prop] && event[prop].type === 'VALARM') {
                    const alarm = event[prop]
                    alarmFound = true
                    alarmTime = alarm.trigger && alarm.trigger.val
                }
            }
            alarmFound.should.be.true
            alarmTime.should.equal('-PT15M')
        })
    })
})