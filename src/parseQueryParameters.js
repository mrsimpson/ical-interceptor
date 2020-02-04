/**
 * Enables support for passing parameters as comma separate values
 * @param {*} query 
 */
function parseQueryParameters(query){
    const parsed = JSON.parse(JSON.stringify(query))

    for(p in parsed){
        if(parsed.hasOwnProperty(p)){
            let arr = parsed[p].split && (parsed[p]).split(',')
            if(arr && arr.length > 1){
                parsed[p] = arr
            }

            if(p.match(/^filter\./)){
                const newFilter = {}
                newFilter[p.replace(/^filter./, '')] = parsed[p]
                parsed.filter = Object.assign(parsed.filter || {}, newFilter)
                delete parsed[p]
            }

        }
    }

    return parsed
}

module.exports = parseQueryParameters