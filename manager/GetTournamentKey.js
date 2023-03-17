const Manager = require('./Manager.js')

class GetTournamentKey extends Manager {
    static name = 'GetTournamentKey'

    constructor() {
        super()
    }

    runTask() {
        var sql = `SELECT key, name
        FROM tournaments
        `

        // console.log(sql)

        return new Promise((resolve, reject) => {
            Manager.db.all(sql, (err, tournamentKeys) => {
                if (err) {
                    reject({
                        "results": err,
                        "customCode": 500
                    })
                }
                
                if (tournamentKeys == undefined) {
                    reject({
                        "results": "No tournaments",
                        "customCode": 406
                    })
                } else {
                
                    resolve(tournamentKeys)
                }
            })
        })
    }
}

module.exports = GetTournamentKey