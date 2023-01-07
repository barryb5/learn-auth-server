const Manager = require('./Manager.js')

class GetMatches extends Manager {
    static name = 'getMatches'

    constructor() {
        super()
    }

    runTask(body) {
        var sql = `SELECT * FROM matches
            WHERE gameKey = '${body.tournamentKey}'
            ORDER BY matchNumber`


        return new Promise((resolve, reject) => {
            Manager.db.all(sql, (err, matches) => {
                if (err) {
                    console.error(`Error with getMatches(): ${err}`)
                    reject(`Error with getMatches(): ${err}`)
                } else {
                    let modifiedMatches = []
                    let largestQm = matches[0].matchNumber

                    matches.forEach((match) => {
                        if (match.matchType === 'qm') {
                            modifiedMatches.push(match)
                            if (match.matchNumber > largestQm) {
                                largestQm = match.matchNumber
                            }
                        }
                    })

                    // console.log(largestQm)

                    matches.forEach((match) => {
                        if (match.matchType !== 'qm') {
                            let nonQualNumber = parseInt(match.key.substring(9, 10))
                            if (match.matchType === 'qf') {
                                match.matchNumber = nonQualNumber + largestQm
                            } else if (match.matchType === 'ef') {
                                if (nonQualNumber < 3) {
                                    match.matchNumber = 4 + nonQualNumber + largestQm
                                } else if (nonQualNumber < 6) {
                                    match.matchNumber = 6 + nonQualNumber + largestQm
                                } else {
                                    match.matchNumber = 7 + nonQualNumber + largestQm
                                }
                            } else if (match.matchType === 'sf') {
                                match.matchNumber = 6 + nonQualNumber + largestQm
                            } else if (match.matchType === 'f') {
                                nonQualNumber = parseInt(match.key.substring(8, 9))
                                match.matchNumber = 11 + nonQualNumber + largestQm
                            } else if (match.matchType === 'gf') {
                                match.matchNumber = 8 + nonQualNumber + largestQm
                            } else {
                                // Not a match type we know of 
                                console.log(match)
                            }

                            modifiedMatches.push(match)
                        }

                    })

                    resolve(modifiedMatches)
                }
            })
        })
        .catch((err) => {
            if (err) {
                return err
            }
        })
        .then((results) => {
            return results
        })
    }
}

module.exports = GetMatches