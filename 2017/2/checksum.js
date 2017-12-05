function checksum(data) {
  return data.map(row => getMinMax(row))
    .reduce((acc, { min, max }) => acc += max - min, 0);
}

function getMinMax(array = []) {
  let min = array[0] || 0;
  let max = array[0] || 0;
  array.forEach(val => {
    min = val < min ? val : min;
    max = val > max ? val : max;
  })
  return { min, max };
}

function cleanData(data) {
  return data.split('\n')
    .map(row => row.split("\t")
      .filter(val => val)
      .map(val => parseInt(val.trim()))
    )
    .filter(row => row.length > 0);
}

module.exports = {
  "Part 1": input => checksum(cleanData(input))
};
