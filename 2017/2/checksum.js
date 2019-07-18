function checksum(data, rowReducer) {
  return data.map(rowReducer)
    .reduce((acc, val) => acc += val, 0);
}

function getMinMax(array = []) {
  let min = array[0] || 0;
  let max = array[0] || 0;
  array.forEach(val => {
    min = val < min ? val : min;
    max = val > max ? val : max;
  })
  return max-min;
}

function cleanData(data) {
  return data.split('\n')
    .map(row => row.split("\t")
      .filter(val => val)
      .map(val => parseInt(val.trim()))
    )
    .filter(row => row.length > 0);
}

function getDivisor(array = []) {
  for(let i=0; i<array.length; i++) {
    for(let j=0; j<array.length; j++) {
      if(array[i] % array[j] === 0 && i !== j) {
        return array[i] / array[j];
      }
    }
  }
}

module.exports = {
  "Part 1": input => checksum(cleanData(input), getMinMax),
  "Part 2": input => checksum(cleanData(input), getDivisor)
};
