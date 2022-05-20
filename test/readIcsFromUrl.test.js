require('should')
const nock = require('nock')
const readIcsFromUrl = require('../src/readJcalFromUrl')
const {
    getValidCalendar
} = require('./data/ics')

const BASE_URL = 'http://source.ics'

describe('readIcsFromUrl', () => {
    it('should parse a valid ics properly', async () => {
        nock(BASE_URL)
            .get('/validIcs')
            .once()
            .reply(200, getValidCalendar())
        const ics = await readIcsFromUrl(`${BASE_URL}/validIcs`)

        ics.should.not.be.empty()
    })

    it('should fail if the url does not return a proper ics', (done)=>{
        nock(BASE_URL)
            .get('/invalidIcs')
            .once()
            .reply(200, '<html><body>some content</body></html>')
        
            readIcsFromUrl(`${BASE_URL}/invalidIcs`)
            .then(() => done('Expected the parsing to fail'))
            .catch((err) => {
                err.message.should.match(/not.*valid/)
                done()
            })
    })

    it('should fail if the url does resolve', (done)=>{
        nock(BASE_URL)
            .get('/invalidUrl')
            .once()
            .replyWithError(404)
        
            readIcsFromUrl(`${BASE_URL}/invalidUrl`)
            .then(() => done('Expected the invalid URL to be reported'))
            .catch((err) => {
                err.message.should.match(/not.*valid/)
                done()
            })
    })

    it('should accept webcal:// as protocol and resolve it with https', async () => {
        nock('https://source.ics')
            .get('/validIcs')
            .once()
            .reply(200, getValidCalendar())
        const ics = await readIcsFromUrl(`webcal://source.ics/validIcs`)

        ics.should.not.be.empty()
    })
})