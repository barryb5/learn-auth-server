const { row } = require('jstat')
const BaseAnalysis = require('../../BaseAnalysis.js')

class climberSucsessAuto extends BaseAnalysis {
    static name = `climberSucsessAuto`

    constructor(db, team) {
        super(db)
        this.team = team
        this.teamKey = "ftc" + team
        // this.start = start
        // this.end = end
        this.tipped = 0
        this.none = 0
        this.level = 0
        this.failed = 0

        this.array = []
        this.matches = []

    }
    async getData() {
        let a = this
        return new Promise(async (resolve, reject) => {
            //why does await not work when it works in  bestAverageForMetric
            var sql = `SELECT scoutReport, newMatches.key AS key
                    FROM data
                JOIN (SELECT matches.key AS key, matches.matchNumber
                    FROM matches 
                    JOIN teams ON teams.key = matches.teamKey
                    WHERE teams.teamNumber = ?) AS  newMatches ON  data.matchKey = newMatches.key
                `;
            let fullyOn = 0
            let tipped = 0
            let off = 0
            let none = 0
            let arr = []
            let match = []
            a.totalAttempted = 0

            this.db.all(sql, [a.team], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else {
                    (rows || []).forEach(functionAdder);
                     rows.forEach(functionAdder);
                    function functionAdder(row, index, array) {
                        let curr = JSON.parse(row.scoutReport).autoChallengeResult
                        match.push(row.key)
                        arr.push(curr)
                        if (curr === 0) {
                            none++
                        }
                        if (curr === 1) {
                            tipped++
                        }
                        if (curr === 2) {
                            fullyOn++
                        }
                        if(curr == 3)
                        {
                            off++
                        }

                    }
                
                    a.tipped = tipped
                    a.level = fullyOn 
                    a.failed = off 
                    a.none = none
                    a.array = arr 
                    a.matches = match
                    a.totalAttempted = tipped + off + fullyOn
                    resolve("done")


                }
            })




        })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((data) => {
                // console.log(data)
                return data
            })
    }
    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            let a = this
            var temp = await a.getData().catch((err) => {
                if (err) {
                    console.log(err)
                    return err
                }
            })
            // a.result = temp  
            resolve("done")
        })

    }
    finalizeResults() {
        return {
            "failed": this.failed,
            "level": this.level,
            "tipped": this.tipped,
            "noClimb" : this.none,
            "array": this.array.map((item, index) => ({
                "match": this.matches[index],
                "value": item,
            })),
            "totalAttempts" : this.totalAttempted,
            "team": this.team
        }
    }
}
module.exports = climberSucsessAuto

