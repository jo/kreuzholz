export class Kubus {
  render ({ dx, dy, dz }) {
    const laths = []
    for (let x = 0; x < dx; x++) {
      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, 0, dz],
          b: [x, dy, dz]
        })
        laths.push({
          name: 'Unten',
          a: [x, 0, 0],
          b: [x, dy, 0]
        })
      } else {
        laths.push({
          name: 'Links',
          a: [x, 0, 0],
          b: [x, 0, dz]
        })
        laths.push({
          name: 'Rechts',
          a: [x, dy, 0],
          b: [x, dy, dz]
        })
      }
    }
    return laths
  }
}
