const funz = (m, stop, dx, x) => {
  const alk = Math.PI * x / (dx-1 + stop)
  return -Math.sin(alk) * m
}

export class Pflanzkuebel {
  defaults () {
    return {
      lath: '40x40',
      dx: 70,
      dy: 80,
      dz: 280
    }
  }

  render ({ dx, dy, dz }) {
    const m = 6
    // const stop = 2
    const stop = dx

    const laths = []

    const ddk = funz(m, stop, dy, -1)
    console.log("ddk", ddk)

    laths.push({
      name: 'Kufe Vorne',
      a: [-1, ddk, dz - ddk],
      b: [-1, dy-ddk, dz - ddk]
    })
    laths.push({
      name: 'Kufe Hinten',
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
          name: 'Vorne Füllung',
          a: [x, dd + 1, dz - ddt],
          b: [x, dy-ddr - 1, dz - ddt]
        })
        laths.push({
          name: 'Hinten Füllung',
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
          name: 'Vorne',
          a: [x, dd, dz - ddt],
          b: [x, dy-ddr, dz - ddt]
        })
        laths.push({
          name: 'Hinten',
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

    const xlast = dx - 1
    const ddlast = funz(m, stop, dy, xlast)
    const randn = 3;
    const randSteigung = 0.1
    for (let n = 1; n < randn; n++) {
      laths.push({
        name: 'Sitzrand Vorne',
        a: [xlast + n*randSteigung, ddlast - 1, dz - ddlast + n],
        b: [xlast + n*randSteigung, dy-ddlast + 1, dz - ddlast + n]
      })
      laths.push({
        name: 'Sitzrand Hinten',
        a: [xlast + n*randSteigung, ddlast - 1, ddlast - n],
        b: [xlast + n*randSteigung, dy - ddlast + 1, ddlast - n]
      })
      laths.push({
        name: 'Sitzrand Links',
        a: [xlast + n*randSteigung, ddlast - n, ddlast - n],
        b: [xlast + n*randSteigung, ddlast - n, dz - ddlast + n]
      })
      laths.push({
        name: 'Sitzrand Rechts',
        a: [xlast + n*randSteigung, dy - ddlast + n, ddlast - n],
        b: [xlast + n*randSteigung, dy - ddlast + n, dz - ddlast + n]
      })
    }
    
    laths.push({
      name: 'Sitzrand Vorne',
      a: [xlast - 1 + randSteigung, ddlast - 1, dz - ddlast + 1],
      b: [xlast - 1 + randSteigung, dy-ddlast + 1, dz - ddlast + 1]
    })
    laths.push({
      name: 'Sitzrand Hinten',
      a: [xlast - 1 + randSteigung, ddlast - 1, ddlast - 1],
      b: [xlast - 1 + randSteigung, dy - ddlast + 1, ddlast - 1]
    })
    laths.push({
      name: 'Sitzrand Links',
      a: [xlast - 1 + randSteigung, ddlast - 1, ddlast - 1],
      b: [xlast - 1 + randSteigung, ddlast - 1, dz - ddlast + 1]
    })
    laths.push({
      name: 'Sitzrand Rechts',
      a: [xlast - 1 + randSteigung, dy - ddlast + 1, ddlast - 1],
      b: [xlast - 1 + randSteigung, dy - ddlast + 1, dz - ddlast + 1]
    })
    return laths
  }
}
