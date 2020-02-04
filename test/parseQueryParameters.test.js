require('should')
const parseQueryParameters = require('../src/parseQueryParameters')

describe('parseQueryParameters', () => {
    it('should propagate parameters unchanged', () => {
        const query = {
            url: 'a',
            arr: ['1', '2']
        }
        const parsed = parseQueryParameters(query)

        parsed.should.deepEqual(query)
    })

    it('should identify comma separate values as array', () => {
        const query = {
            arr: '2,3'
        }
        const parsed = parseQueryParameters(query)

        parsed.should.deepEqual({
            arr: ['2', '3']
        })
    })

    it('should group filters', () => {
        const query = {
            'filter.X-MICROSOFT-CDO-BUSYSTATUS': 'BUSY',
            'filter.SUMMARY': '/US/i'
        }
        const parsed = parseQueryParameters(query)

        parsed.should.deepEqual({
            'filter': {
                'X-MICROSOFT-CDO-BUSYSTATUS': 'BUSY',
                'SUMMARY': '/US/i'
            }
        })
    })
})