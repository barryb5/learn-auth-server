//for testing

const Manager = require('./manager/dbmanager')
const test = require('./analysis/teleop/cargo/cylcingDetials')
// const test = require('./analysis/categoryMetrics')
// const test = require('./analysis/general/averageScoreDetails')

// const y = require("./test")
async function temp() {
   // var x = new test(Manager.db, "2022cc", 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0)
   // var x = new test(Manager.db, 2813, 8033, 4414)
   var x = new test(Manager.db, 2342, 0, 4)
  await x.runAnalysis()
 console.log(x.finalizeResults())
}
temp()


//2022cc_qm9_5	3256
//2022cc_qm31_5 3476
//2022cc_qm34_5 2813
