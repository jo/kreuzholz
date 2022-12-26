const funz = (m, stop, dx, x) => {
  const alk = Math.PI * x / (dx-1 + stop)
  return -Math.sin(alk) * m
}

export class Brotkasten {
  render ({ dx, dy, dz }) {
    const m = 2
    // const stop = 2
    const stop = 12

    const laths = []

    const ddk = funz(m, stop, dy, -1)

    laths.push({
      name: 'Kufe Oben',
      a: [-1, ddk, dz - ddk],
      b: [-1, dy-ddk, dz - ddk]
    })
    laths.push({
      name: 'Kufe Unten',
      a: [-1, ddk, ddk],
      b: [-1, dy-ddk, ddk]
    })

    for (let y = 0; y <= dy; y++) {
      laths.push({
        name: `Boden ${y}`,
        a: [0, y, 0],
        b: [0, y, dz]
      })
    }

    for (let x = 1; x < dx; x++) {
      const dd = funz(m, stop, dy, x)
      const ddr = dd // 0
      const ddt = dd // 0
      const ddb = dd // 0

      if (x % 2 === 0) {
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
      } else {
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
    }
    return laths
  }
}
