const Manager = require('./Manager.js')
const { Server } = require("socket.io")
const { resolve } = require('mathjs')
const server = require("../collectionServer.js")
const io = new Server(server)


class getPickedTeams extends Manager {
    static name = "getPickedTeams"

    constructor() {
        super()
    }

    async runTask(){

        var sql = `SELECT *
        FROM pickedTeams`
        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                io.emit('pickedTeams', rows)
                resolve(rows)
            })
        })

    }
}

module.exports = getPickedTeams
