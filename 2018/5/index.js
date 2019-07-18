const getInput = require('../../utils/getInput')

function part1(input) {
  let hasPairs = true
  let output = input

  do {
    const step = removePair(output)
    if(output === step) {
      hasPairs = false
      console.log("end loop")
    } else {
      output = step
    }
  } while (hasPairs)

  console.log(output.length)

  return output.length
}

function removePair(str) {
  let outputStr = str

  const match = Array.from(str)
    .map((char, index) => ({char, index}))
    .find(({char, index}, findIndex, arr) => {
      const nextChar = arr[index+1] && arr[index+1].char
      return isMatch(char, arr[index+1].char)
    })
  
  if(match) {
    outputStr = str.substr(0, match.index) + str.substr(match.index+2)
  }

  return outputStr
}

function isMatch(char1, char2) {
  return char1 && char2
    && char1 !== char2
    && (
      char1.toUpperCase() === char2
      || char1 === char2.toUpperCase()
    )
}

function part2(input) {
  console.log(input)
}

module.exports = {
  "Part 1": part1,
  "Part 2": part2
}

getInput(2018, 5).then(part1)