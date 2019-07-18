const getInput = require('../../utils/getInput')

const inputRegex = /\[(.*)] (.*)/

function part1(input) {
  const log = input.split('\n')
    .map(line => {
      const [time, message] = inputRegex.exec(line) || []
      return {
        time,
        message
      }
    })
    .filter(msg => msg.time && msg.message)
    .sort((msg1, msg2) => msg1.time.localeCompare(msg2)) // this sort is wrong...
  console.log(log)
}

function part2(input) {
  console.log(input)
}

module.exports = {
  "Part 1": part1,
  "Part 2": part2
}

getInput(2018, 4).then(part1)