export class Regal {
  render ({ dx, dy, dz }) {
    const faecher = Math.round(dz/10);
    const abst = dz / faecher

    const laths = []
    for (let x = 0; x < dx; x++) {
      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, 0, dz],
          b: [x, dy, dz]
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
      for (let f = 0; f < faecher; f++) {
        if (x % 2 === 0) {
          laths.push({
            name: `Fach ${f}`,
            a: [x, 0, f*abst],
            b: [x, dy, f*abst]
          })
        } else {
        }
      }
    }
    return laths
  }
}
