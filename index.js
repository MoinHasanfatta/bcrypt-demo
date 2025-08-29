const bcrypt = require('bcrypt')

const salt = 10

const hash =  bcrypt.hashSync('hello',salt)
console.log(hash)

const status = bcrypt.compareSync('Hello',hash)
console.log(status)

const str = 'AbCd'
const pwd = str.toLowerCase()
console.log(pwd)

// This is the entire logic for bcrypt
// < 10 > 8 1 special 1 number 1 upperCase 1 lowerCase