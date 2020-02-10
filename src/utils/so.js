// https://stackoverflow.com/a/13532993
const shade = (color, percent) => {
  const R = 1,
    G = 3,
    B = 5

  const _shade = (hue, color, percent) => {
    let H = parseInt(color.substring(hue, hue + 2), 16)
    H = parseInt((H * (100 + percent)) / 100)
    H = H < 255 ? H : 255
    return H.toString(16).length === 1 ? `0${H.toString(16)}` : H.toString(16)
  }

  return `#${_shade(R, color, percent)}${_shade(G, color, percent)}${_shade(B, color, percent)}`
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
// https://stackoverflow.com/a/1527820
function randomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
  shade,
  randomInt,
}
