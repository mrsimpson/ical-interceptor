const fetch = require('node-fetch')
const ical = require('ical.js')

async function readJcalFromUrl(url) {
    let jCal  
    try {
        const resource = await fetch(url.replace(/.*cal:\/\//,'https://'))
        jCal = ical.parse(await resource.text())
        // jCal = await ical.fromURL(url)
    } catch (err) {
        console.warn(url, err)
    }
    if (!jCal || Object.keys(jCal).length === 0) {
        console.log('URL', url, 'jCal', JSON.stringify(jCal) )
        throw new Error('URL supplied does not yield a valid iCal calendar')
    }

    return jCal
}

module.exports = readJcalFromUrl