const getInput = require('../../utils/getInput')
const cookie = require('../../utils/cookie');
const request = require('request-promise')
const fs = require('fs')

const lineRegex = /#(\d*) @ (\d*),(\d*): (\d*)x(\d*)/

function part1(input) {
  const shapes = input.split('\n').map(line => {
    const [match, id, x, y, w, h] = lineRegex.exec(line) || []
    return {id, x: parseInt(x), y: parseInt(y), w: parseInt(w), h: parseInt(h)}
  })

  const fabric = new Array(1000).fill().map(() => new Array(1000).fill(0))

  shapes.forEach(shape => {
    for(let x = shape.x; x < (shape.x + shape.w); x++) {
      for(let y = shape.y; y < (shape.y + shape.h); y++) {
        fabric[x][y]++
      }
    }
  })

  const imageData = fabric.reduce((arr, row) => {
    return arr.concat(row)
  }, []).map(data => Math.min(data, 255))

  const totalOverlap = fabric.reduce((sum, row) => {
    sum += row.reduce((rowSum, overlap) => {
      if(overlap > 1) {
        rowSum++
      }
      return rowSum
    }, 0)
    return sum
  }, 0)

  console.log(totalOverlap)
}

function makeImage(input) {
  // browser only
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 1000
  const context = canvas.getContext('2d')

  const shapes = input.split('\n').map(line => {
    const [match, id, x, y, w, h] = lineRegex.exec(line) || []
    return {id, x: parseInt(x), y: parseInt(y), w: parseInt(w), h: parseInt(h)}
  })

  const fabric = new Array(1000).fill().map(() => new Array(1000).fill(0))

  shapes.forEach(shape => {
    for(let x = shape.x; x < (shape.x + shape.w); x++) {
      for(let y = shape.y; y < (shape.y + shape.h); y++) {
        fabric[x][y]++
      }
    }
  })

  const data = fabric.reduce((arr, row) => {
    row.forEach(value => arr.push(value))
    return arr
  }, [])
    .map(data => Math.min(data, 255))
    .map(value => [value, value, value, 255])
    .reduce((acc, color) => {
      color.forEach(value => acc.push(value))
      return acc
    }, [])

  console.log(data[0])
  console.log(data.length)
  const imageData = new ImageData(Uint8ClampedArray.from(data), 1000, 1000)
  context.putImageData(imageData, 0, 0)

  document.body.prepend(canvas)
}

function totalOverlap(shapes) {
  const totalOverlap = shapes.reduce((sum, outerShape, outerIndex) => {
    const overlap = shapes.reduce((overlap, innerShape, innerIndex) => {
      if(outerIndex === innerIndex) {
        return overlap
      }
      overlap += findOverlap(outerShape, innerShape)
      return overlap
    }, 0)
    sum += overlap
    return sum
  }, 0)
  return totalOverlap
}

function findOverlap(outer, inner) {
  const xOverlap = Math.min(outer.x, inner.x) - Math.max(outer.x, inner.x) + Math.min(outer.w, inner.w)
  const yOverlap = Math.min(outer.y, inner.y) - Math.max(outer.y, inner.y) + Math.min(outer.h, inner.h)
  if(xOverlap <= 0 || yOverlap <= 0) {
    return 0
  } else {
    return xOverlap * yOverlap
  }
}

function part2(input) {
  const shapes = input.split('\n').map(line => {
    const [match, id, x, y, w, h] = lineRegex.exec(line) || []
    return {id, x: parseInt(x), y: parseInt(y), w: parseInt(w), h: parseInt(h)}
  })

  const fabric = new Array(1000).fill().map(() => new Array(1000).fill(0))
  const overlapped = {}

  shapes.forEach(shape => {
    for(let x = shape.x; x < (shape.x + shape.w); x++) {
      for(let y = shape.y; y < (shape.y + shape.h); y++) {
        const current = fabric[x][y]
        if(current === 0) {
          fabric[x][y] = [shape.id]
        } else {
          fabric[x][y].push(shape.id)
          fabric[x][y].forEach(id => overlapped[id] = true)
        }
      }
    }
  })

  const remaining = shapes.filter(shape => !overlapped[shape.id])

  console.log(remaining)
}

module.exports = {
  "Part 1": input => part1(input),
  "Part 2": input => part2(input)
}

const inputPromise = request('https://adventofcode.com/2018/day/3/input', {headers: {Cookie: cookie()}})

inputPromise.then(part1)
// inputPromise.then(part2)