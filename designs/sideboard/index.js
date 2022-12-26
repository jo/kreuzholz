export class Sideboard {
  defaults () {
    return {
      lath: '17x30',
      dx: 38,
      dy: 270,
      dz: 75
    }
  }

  render ({ q1, q2, dx, dy, dz }) {
    const m = 2
    const stop = 12
    const vfaecher = Math.ceil(q2*dy / 80)
    const vfaechd = dy/vfaecher
    const bodenh = 3

    const laths = []
    for (let x = 0; x < dx; x++) {
      const al = Math.PI * x / (dx-1 + stop)
      const dd = -Math.sin(al) * m
      const ddr = dd // 0
      const ddt = 0 // dd // 0
      const ddb = 0 // dd // 0

      const fach = Math.round(dz*0.618)

      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, dd, dz - ddt],
          b: [x, dy-ddr, dz - ddt]
        })
        laths.push({
          name: 'Unten',
          a: [x, dd, bodenh + ddb],
          b: [x, dy-ddr, bodenh + ddb]
        })
        laths.push({
          name: 'H-Fach',
          a: [x, dd, fach],
          b: [x, dy-ddr, fach]
        })
        laths.push({
          name: 'Links Füllung',
          a: [x, dd, ddb],
          b: [x, dd, dz - ddt - 1]
        })
        laths.push({
          name: 'Rechts Füllung',
          a: [x, dy-ddr, ddb],
          b: [x, dy-ddr, dz - ddt - 1]
        })
      } else {
        laths.push({
          name: 'Oben Füllung',
          a: [x, dd + 1, dz - ddt],
          b: [x, dy-ddr - 1, dz - ddt]
        })
        laths.push({
          name: 'Unten Füllung',
          a: [x, dd + 1, bodenh + ddb],
          b: [x, dy-ddr - 1, bodenh + ddb]
        })
        laths.push({
          name: 'H-Fach Füllung',
          a: [x, dd + 1, fach],
          b: [x, dy-ddr - 1, fach]
        })
        laths.push({
          name: 'Links',
          a: [x, dd, ddb],
          b: [x, dd, dz - ddt]
        })
        
        for (let f = 1; f < vfaecher; f++) {
          laths.push({
            name: `V-Fach #${f}`,
            a: [x, f*vfaechd, ddb],
            b: [x, f*vfaechd, dz - ddt]
          })
        }
        laths.push({
          name: 'Rechts',
          a: [x, dy-ddr, ddb],
          b: [x, dy-ddr, dz - ddt]
        })
      }
    }
    return laths
  }
}
