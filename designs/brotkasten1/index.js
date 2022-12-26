export class Brotkasten {
  render ({ dx, dy, dz }) {
    const m = 2
    // const stop = 2
    const stop = 12

    const laths = []
    for (let x = 0; x < dx; x++) {
      const al = Math.PI * x / (dx-1 + stop)
      const dd = -Math.sin(al) * m
      const ddr = dd // 0
      const ddt = dd // 0
      const ddb = dd // 0

      if (x === 1) {
        for (let y = 0; y <= Math.floor(dy - 2*dd); y++) {
          laths.push({
            name: `Boden ${y}`,
            a: [x, dd + y, ddb],
            b: [x, dd + y, dz - ddt]
          })
        }
      // } else if (x === dx - 2) {
        // for (let y = 0; y <= Math.floor(dy - 2*dd); y++) {
        //   laths.push({
        //     name: `Deckel ${y}`,
        //     a: [x, dd + y, ddb],
        //     b: [x, dd + y, dz - ddt]
        //   })
        // }
      } else {
        if (x % 2 === 0) {
          laths.push({
            name: 'Oben',
            a: [x, dd, dz - ddt],
            b: [x, dy-ddr, dz - ddt]
          })
          laths.push({
            name: 'Unten',
            a: [x, dd, ddb],
            b: [x, dy-ddr, ddb]
          })
          if (x > 0) {
          // if (x > 0 && x < dx - 1) {
            laths.push({
              name: 'Links Füllung',
              a: [x, dd, ddb + 1],
              b: [x, dd, dz - ddt - 1]
            })
            laths.push({
              name: 'Rechts Füllung',
              a: [x, dy-ddr, ddb + 1],
              b: [x, dy-ddr, dz - ddt - 1]
            })
          }
        } else {
          laths.push({
            name: 'Oben Füllung',
            a: [x, dd + 1, dz - ddt],
            b: [x, dy-ddr - 1, dz - ddt]
          })
          laths.push({
            name: 'Unten Füllung',
            a: [x, dd + 1, ddb],
            b: [x, dy-ddr - 1, ddb]
          })
          laths.push({
            name: 'Links',
            a: [x, dd, ddb],
            b: [x, dd, dz - ddt]
          })
          laths.push({
            name: 'Rechts',
            a: [x, dy-ddr, ddb],
            b: [x, dy-ddr, dz - ddt]
          })
        }
      }
    }
    return laths
  }
}
