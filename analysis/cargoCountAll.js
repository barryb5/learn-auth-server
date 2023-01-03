const BaseAnalysis = require('./BaseAnalysis.js')

class cargoCountAll extends BaseAnalysis {
    static name = `cargoCountAll`

    constructor(db) {
        super(db)
        // this.team = team
        // // this.start = start
        // // this.end = end
        // this.teamKey = "ftc" + team
        this.result = 0
        
    }
    async getCount()
    {
        let a = this
        return new Promise(async function(resolve, reject)
        {
            //why does await not work when it works in  bestAverageForMetric
                var sql = `SELECT scoutReport
                FROM data
                JOIN (SELECT matches.key, matches.matchNumber
                    FROM matches 
                    JOIN teams ON teams.key = matches.teamKey
                    WHERE teams.teamNumber = ?) AS  newMatches ON  data.matchKey = newMatches.key
              `
              let len = 0
              let makes = 0
                a.db.all(sql, [a.team], (err, rows) =>
                {
                    

                    rows.forEach(functionAdder);
                    function functionAdder(row, index, array){
                        let curr = JSON.parse(row.scoutReport).events
                        for(var i = 0; i < curr.length; i++) {
                            let subArr = curr[i]
                            if (subArr[1] === 0) {
                              makes++
                            
                            }
                        }
                        len++
                       

                    }
                    resolve(makes/len)
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
    
        runAnalysis()
        {
            return new Promise(async (resolve, reject) =>
            {
                console.log("here")
                let a = this
                var temp = await a.getCount().catch((err) => {
                    if (err) {

                        console.log(err)
                        return err
                    }
                })  
                a.result = temp  
                resolve("done")        
            })
            
        }
        finalizeResults()
        {
            return { 
                "result": this.result,
                "team": this.team
            }
        }

}
module.exports = cargoCount
const BaseAnalysis = require('./BaseAnalysis.js')

class cargoCount extends BaseAnalysis {
    static name = `cargoCount`

    constructor(db, team) {
        super(db)
        this.team = team
        // this.start = start
        // this.end = end
        this.teamKey = "ftc" + team
        this.result = 0
        
    }
    async getCount()
    {
        let a = this
        return new Promise(async function(resolve, reject)
        {
            //why does await not work when it works in  bestAverageForMetric
                var sql = `SELECT scoutReport
                FROM data
                JOIN (SELECT matches.key, matches.matchNumber
                    FROM matches 
                    JOIN teams ON teams.key = matches.teamKey
                    ) AS  newMatches ON  data.matchKey = newMatches.key
              `
              let len = 0
              let makes = 0
                a.db.all(sql, [], (err, rows) =>
                {
                    

                    rows.forEach(functionAdder);
                    function functionAdder(row, index, array){
                        let curr = JSON.parse(row.scoutReport).events
                        for(var i = 0; i < curr.length; i++) {
                            let subArr = curr[i]
                            if (subArr[1] === 0) {
                              makes++
                            
                            }
                        }
                        len++
                       

                    }
                    resolve(makes/len)
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
    
        runAnalysis()
        {
            return new Promise(async (resolve, reject) =>
            {
                console.log("here")
                let a = this
                var temp = await a.getCount().catch((err) => {
                    if (err) {

                        console.log(err)
                        return err
                    }
                })  
                a.result = temp  
                resolve("done")        
            })
            
        }
        finalizeResults()
        {
            return { 
                "result": this.result,
                // "team": this.team
            }
        }

}
module.exports = cargoCountAll
