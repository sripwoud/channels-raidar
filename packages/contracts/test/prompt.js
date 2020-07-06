const readline = require('readline-sync')

const instance = readline.question(
  `What is the deployed instance address?
> `
)

module.exports = instance
