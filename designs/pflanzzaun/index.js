export class Pflanzzaun {
  defaults () {
    return {
      lath: '38x58',
      dx: 40,
      dy: 200,
      dz: 190
    }
  }
  horizontal () {
    return true
  }

  render ({ q1, q2, dx, dy, dz }) {
    const m = 2
    const stop = 12
    const vfaecher = Math.round(q2*dy / 80)
    const vfaechd = dy/vfaecher + 1
    const bodenh = 6
    const fach = Math.round(3/4*dz) - 1
    const fach2 = Math.round(2/4*dz) - 1

    const laths = []
    const trog = (x, z, df) => {
      if (x === 0 || x === dx - 1) {
        laths.push({
          name: 'Trog Top',
          a: [x, 0, z + df + 1],
          b: [x, dy, z + df + 1]
        })
        if (x === 0) {
        laths.push({
          name: 'Trog Top 2',
          a: [x, 0, z + df + 2],
          b: [x, dy, z + df + 2]
        })
        }
      }
      if (x % 2 === 0) {
        laths.push({
          name: 'Trog',
          a: [x, 0, z + df],
          b: [x, dy, z + df]
        })
      } else {
        laths.push({
          name: 'Trog Füllung',
          a: [x, 1, z + df],
          b: [x, dy - 1, z + df]
        })
      }
    }

    for (let x = 0; x < dx; x++) {
      const al = Math.PI * x / (dx-1 + stop)
      const dd = 0 // -Math.sin(al) * m
      const ddr = dd // 0


      const af = Math.PI * x / dx
      const fm = 3
      const ddf = -Math.sin(af) * fm
      
      const ddt =  -ddf
      const ddb = ddf

      trog(x, dz-2, ddf)
      trog(x, bodenh, ddf)
      trog(x, fach, ddf)
      trog(x, fach2, ddf)
      if (x % 2 === 0) {
      } else {
        laths.push({
          name: 'Links',
          a: [x, dd, 0],
          b: [x, dd, dz]
        })
        for (let f = 1; f < vfaecher; f++) {
          laths.push({
            name: `V-Fach #${f}`,
            a: [x, f*vfaechd, 0],
            b: [x, f*vfaechd, dz - ddt - 2]
          })
        }
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
