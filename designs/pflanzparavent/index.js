export class Pflanzparavent {
  defaults () {
    return {
      lath: '38x58',
      dx: 23,
      dy: 120,
      dz: 90
    }
  }
  horizontal () {
    return true
  }

  render ({ q1, q2, dx, dy, dz }) {
    if (dx % 2 === 0) dx += 1

    const m = 1
    const stop = 12
    const vfaecher = Math.round(q2*dy / 180)
    const vfaechd = dy/vfaecher + 1
    const bodenh = 6
    const fach = Math.round(3/4*dz) - 1
    const fach2 = Math.round(2/4*dz) - 1

    const laths = []
    const trog = (x, z, df, big = false) => {
      if (x === 0 || x === dx - 1) {
        laths.push({
          name: 'Trog Top',
          a: [x, 0, z + df + 1],
          b: [x, dy, z + df + 1]
        })
        if ((x === 0 || x === dx - 1) && big) {
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

      const af = Math.PI * x / (dx-1)
      const fm = 1.5
      const ddf = -Math.sin(af) * fm
      
      const ddt =  -ddf
      const ddb = ddf

      trog(x, dz-1, ddf)
      trog(x, bodenh, ddf, true)
      // trog(x, fach, ddf)
      // trog(x, fach2, ddf)
      if (x % 2 === 0) {
        if (x === 0 || x === dx-1) {
          laths.push({
            name: 'Bein links',
            a: [x, ddr, 0],
            b: [x, ddr, bodenh + ddf - 1]
          })
          laths.push({
            name: 'Bein links oben',
            a: [x, ddr, bodenh + ddf + 3],
            b: [x, ddr, dz - 2]
          })
          laths.push({
            name: 'Bein rechts',
            a: [x, dy-ddr, 0],
            b: [x, dy-ddr, bodenh + ddf - 1]
          })
          laths.push({
            name: 'Bein rechts oben',
            a: [x, dy-ddr, bodenh + ddf + 3],
            b: [x, dy-ddr, dz - 2]
          })
        } else {
          laths.push({
            name: 'Linx Füllung oben',
            a: [x, ddr, dz + ddf],
            b: [x, ddr, dz]
          })
          laths.push({
            name: 'Linx Füllung unten',
            a: [x, ddr, bodenh + 1 + ddf],
            b: [x, ddr, bodenh + 2]
          })
          laths.push({
            name: 'Rechts Füllung oben',
            a: [x, dy-ddr, dz + ddf],
            b: [x, dy-ddr, dz]
          })
          laths.push({
            name: 'Rechts Füllung unten',
            a: [x, dy-ddr, bodenh + 1 + ddf],
            b: [x, dy-ddr, bodenh + 2]
          })
        }
      } else {
        for (let f = 1; f < vfaecher; f++) {
          laths.push({
            name: `V-Fach #${f}`,
            a: [x, f*vfaechd, 0],
            b: [x, f*vfaechd, dz - ddt - 2]
          })
        }
        if (x === 1 || x === dx-2) {
          laths.push({
            name: 'Rechts',
            a: [x, dy-ddr, 0],
            b: [x, dy-ddr, dz]
          })
          laths.push({
            name: 'Links',
            a: [x, dd, 0],
            b: [x, dd, dz]
          })
        } else {
          laths.push({
            name: 'Rechts',
            a: [x, dy-ddr, bodenh + ddf],
            b: [x, dy-ddr, dz]
          })
          laths.push({
            name: 'Links',
            a: [x, dd, bodenh + ddf],
            b: [x, dd, dz]
          })
        }
      }
    }
    return laths
  }
}
