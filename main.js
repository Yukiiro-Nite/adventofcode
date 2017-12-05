const fs = require('fs');
const getInput = require('./utils/getInput');
const args = process.argv.slice(2);

function main(year, day, part) {
  const solutions = getSolutions();
  const solutionsToRun = getSolutionsToRun(solutions, year, day, part);
  runSolutions(solutionsToRun, part).then(printSolutions);
}

function getSolutions() {
  const solutions = getFolders(__dirname)
    .filter(isNumber)
    .reduce((acc, yearFolder) => {
      const yearPath = `${__dirname}/${yearFolder}`;
      const days = getFolders(yearPath).filter(isNumber);
      const answers = days.map(dayFolder => {
        return fs.readdirSync(`${yearPath}/${dayFolder}`)
          .map(answerFolder => {
            const required = require(`${yearPath}/${dayFolder}/${answerFolder}`);
            return {
              year: yearFolder,
              day: dayFolder,
              answer: required
            };
          })
      });
      return acc.concat(answers.reduce((acc, arr) => acc.concat(arr), []));
    }, []);

    return solutions;
}

function getFolders(path) {
  return fs.readdirSync(path)
  .filter(filename => fs.statSync(`${path}/${filename}`).isDirectory());
}

function isNumber(filename) {
  return /\d*/.exec(filename)[0];
}

function getSolutionsToRun(solutions, year, day, part) {
  return solutions.filter((solution) => {
    return solution.year === year || year === undefined
      && solution.day === day || day === undefined
  })
}

function runSolutions(solutions, part) {
  const solutionOutputs = solutions.map(solution =>
    getInput(solution.year, solution.day)
      .then(data => {
        const parts = part ? [ part ] : Object.keys(solution.answer);
        solution.output = {};

        parts.forEach(partName => {
          const answer = solution.answer[partName];
          if(answer) {
            solution.output[partName] = answer(data);
          }

        });

        return solution;
      })
    );
  return Promise.all(solutionOutputs);
}

function printSolutions(solutions) {
  solutions.forEach(({ year, day, output }) => Object.keys(output)
    .forEach(part =>
      console.log(`${year}, Day ${day}, Solution ${part}: ${output[part]}`)
    )
  )
};

main(args[0], args[1], args[2]);
