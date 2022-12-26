export class Tube {
  render ({ dx, dy, dz }) {
    const m = 4

    const laths = []
    for (let x = 0; x < dx; x++) {
      const al = Math.PI * x / dx
      const dd = -Math.sin(al) * m
      const ddr = dd // 0

      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, dd, dz],
          b: [x, dy-ddr, dz]
        })
        laths.push({
          name: 'Unten',
          a: [x, dd, 0],
          b: [x, dy-ddr, 0]
        })
      } else {
        laths.push({
          name: 'Oben Füllung',
          a: [x, dd + 1, dz],
          b: [x, dy-ddr - 1, dz]
        })
        laths.push({
          name: 'Unten Füllung',
          a: [x, dd + 1, 0],
          b: [x, dy-ddr - 1, 0]
        })
        laths.push({
          name: 'Links',
          a: [x, dd, 0],
          b: [x, dd, dz]
        })
        laths.push({
          name: 'Rechts',
          a: [x, dy-ddr, 0],
          b: [x, dy-ddr, dz]
        })
      }
    }
    return laths
  }
}
