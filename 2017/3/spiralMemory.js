function getCoordsForValue(value) {
  let level = Math.ceil((Math.sqrt(value)-1) / 2);
  let squareRatio = ((Math.sqrt(value)-1) % 2) / 2;
  let positions = generatePositions(level);
  return positions[Math.floor(positions.length * squareRatio)];
}

function generatePositions(level){
  let width = (level * 2) + 1;
  let maxValue = Math.pow((level * 2) + 1, 2);
  let minValue = Math.pow(((level - 1) * 2) + 1, 2) + 1;
  let size = (width * 4) - 4;
  let values = new Array(size).fill().map((_, i) => minValue + i);
  let positions = values.map((value, i) => {
    let x = level;
    let y = level;
    let changingVal = (i % (width - 1)) - (level);
    let side = Math.floor(i / (width - 1));
    switch(side) {
      case 0:
        y = changingVal;
        break;
      case 1:
        x = -changingVal;
        break;
      case 2:
        y = -changingVal;
        x = -x;
        break;
      case 3:
        x = changingVal;
        y = -y;
        break;
    }
    return {x, y};
  });
  return positions;
}

function spiralMemory1(input) {
  let coords = getCoordsForValue(parseInt(input));
  return Math.abs(coords.x) + Math.abs(coords.y);
}

function spiralMemory2(input) {
  let found;
  let levelCounter = 0;
  let memory = {};
  while (!found) {

  }
}

module.exports = {
  "Part 1": input => spiralMemory1(parseInt(input)),
  "Part 2": input => {}
};
