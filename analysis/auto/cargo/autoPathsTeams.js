const Manager = require('../../../manager/dbmanager.js')
const BaseAnalysis = require('../../BaseAnalysis.js')
const teamStat = require('./autoPaths.js')

// const Manager = require('./manager/dbmanager.js')

class autoPathsTeams extends BaseAnalysis {
    static name = `autoPathsTeams`

    constructor(db, teamOne, teamTwo, teamThree) {
        super(db)
        this.team = team
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.teamThree = teamThree
        this.oneResult = []
        this.twoResult = []
        this.threeResult = []

    }
    async getAccuracy() {
        let a = this
        var one = new teamStat(Manager.db, a.teamOne)
        one.runAnalysis()
        a.oneResult = one.array

        var two = new teamStat(Manager.db, a.teamTwo)
        two.runAnalysis()
        a.twoResult = two.array

        var three = new teamStat(Manager.db, a.teamThree)
        three.runAnalysis()
        a.threeResult = three.array

    }


    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            let a = this
            var temp = await a.getAccuracy().catch((err) => {
                if (err) {
                    return err
                }
            })
            resolve("done")
        })

    }
    finalizeResults() {
        return {
            "onePaths" : this.oneResult,
            "twoPaths" : this.twoResult,
            "threePaths" : this.threeResult,
            "teamOne" : this.teamOne,
            "teamTwo" : this.teamTwo,
            "teamThree" : this.teamThree

        }
    }

}
module.exports = autoPathsTeams