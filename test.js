//for testing
const test = require('./analysis/suggestionsInner')
// const test = require('./analysis/teleop/cargo/cargoCountOverview')
// const test = require('./analysis/picklistShell')
const Manager = require('./manager/dbmanager')

// const y = require("./test")
async function temp() {
   // var x = new test(Manager.db, "2023cafr", 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5)
   // var x = new test(Manager.db, "2023camb", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)
   var x = new test(Manager.db, 852, 8033, 971, "qm")
  await x.runAnalysis()
 
 console.log(x.finalizeResults().paths)
}
temp()


//2022cc_qm9_5	3256
//2022cc_qm31_5 3476
//2022cc_qm34_5 2813
 