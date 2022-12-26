export const length = ({ a, b }) => {
  const ab = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  // TODO
  return Math.sqrt(Math.pow(ab[0], 2) + Math.pow(ab[1], 2) + Math.pow(ab[2], 2)) + 1
}

export const f = d3.format(".2f")

export const lathId = ({ a }) => `l-${a[0]}-${a[1]}-${a[2]}`

export const schemes = {
  stani: {
    even: 0x000000,
    odd: 0xff0000,
    edge: 0xf9d401,
    highlight: 0xffec85
  },
  'woodie': {
    edge: 0x191716,
    even: 0xcf5c36,
    odd: 0xe3b505,
    highlight: 0x588157
  }
}

export const schema = schemes.woodie
