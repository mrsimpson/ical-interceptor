require('should')
const readJcalFromUrl = require('../src/readJcalFromUrl')

describe('readJcalFromUrl', () => {
    it('invalid ical url', () => {
        const jCal = readJcalFromUrl('not-exists')
        jCal.should.be.undefined
    })
})