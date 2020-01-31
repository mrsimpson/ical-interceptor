import {
    async as ical
} from 'node-ical'

export default async function readIcsFromUrl(url) {
    let ics
    try {
        ics = await ical.fromURL(url)
    } catch (err) {
        console.warn(url, err)
    }
    if (!ics || Object.keys(ics).length === 0) {
        throw new Error('URL supplied does not yield a valid iCal calendar')
    }

    return ics
}