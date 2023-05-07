const BaseAnalysis = require('../../BaseAnalysis.js')
const teamStat = require('./levelCargo')
const allStat = require('./levelCargoAll')

const math = require('mathjs')


// const Manager = require('./manager/dbmanager.js')

class levelPicklist extends BaseAnalysis {
    static name = `levelPicklist`

    constructor(db, team, type, location) {
        super(db)
        this.team = team
        this.type = type
        this.location = location
        // this.teamKey = "frc" + team
        // this.start = start
        // this.end = end
       this.zScore = 0
        // this.array = []

    }
    async getAccuracy() {
        let a = this
        let team = new teamStat(a.db, a.team, a.type, a.location)
        await team.runAnalysis()

        let all = new allStat(a.db, a.type, a.location)
        await all.runAnalysis()
        let temp = math.std(all.array)
        a.zScore = (team.average - all.average)/temp
        if(isNaN(a.zScore))
        {
            a.zScore = 0
        }


    }


    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            let a = this
            var temp = await a.getAccuracy().catch((err) => {
                if (err) {
                    return err
                }
            })
            // a.result = temp  
            resolve("done")
        })

    }
    finalizeResults() {
        return {
           "zScore" : this.zScore
        }
    }

}
module.exports = levelPicklist
