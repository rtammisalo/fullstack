require('dotenv').config()
const process = require('node:process')

let PORT = process.env.PORT || 3003
let MONGODB_URI = process.env.MONGODB_URI

const config = { PORT, MONGODB_URI }

module.exports = config