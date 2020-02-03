const fetch = require('node-fetch')
const ical = require('ical.js')

async function readJcalFromUrl(url) {
    let jCal  
    try {
        const resource = await fetch(url)
        jCal = ical.parse(await resource.text())
        // jCal = await ical.fromURL(url)
    } catch (err) {
        console.warn(url, err)
    }
    if (!jCal || Object.keys(jCal).length === 0) {
        throw new Error('URL supplied does not yield a valid iCal calendar')
    }

    return jCal
}

module.exports = readJcalFromUrl