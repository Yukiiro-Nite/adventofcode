function inverseCaptcha(input, offset=1) {
  const result = Array.from(input).reduce((sum, char, index, array) => {
    let matchIndex = (index + offset) % array.length;
    if (char === array[matchIndex]) {
      sum += parseInt(char);
    }

    return sum;
  },0);

  return result;
}

module.exports = {
  "Part 1": input => inverseCaptcha(input),
  "Part 2": input => inverseCaptcha(input, Math.floor(input.length / 2))
};
