import fs from 'fs'
import path from 'path'

export function getValidIcs(){
    return fs.readFileSync(path.resolve(__dirname, 'reachCalendar.ics'))
}