export class Bank {
  render ({ dx, dy, dz }) {
    const laths = []

    const t = dx % 2 === 0 ? dx + 1 : dx
    const m = Math.floor(t/2)

    const abstand_pfeiler = 3

    laths.push({
      name: 'Kiel',
      a: [m, abstand_pfeiler, 1],
      b: [m, dy - abstand_pfeiler, 1]
    })
    for (let x = 0; x < t; x++) {
      if (x % 2 === 0) {
        laths.push({
          name: 'Sitz',
          a: [x, 0, dz],
          b: [x, dy, dz]
        })
      } else {
        laths.push({
          name: 'Sitz Füllung Links',
          a: [x, 0, dz],
          b: [x, abstand_pfeiler - 1, dz]
        })
        laths.push({
          name: 'Sitz Füllung Mitte',
          a: [x, abstand_pfeiler + 1, dz],
          b: [x, dy - abstand_pfeiler - 1, dz]
        })
        laths.push({
          name: 'Sitz Füllung Rechts',
          a: [x, dy - abstand_pfeiler + 1, dz],
          b: [x, dy, dz]
        })
      }
    }
    for (let x = 0; x < t; x++) {
      if (x % 2 !== 0) {
        const z1 = (x === 1 || x === t - 2) ? 0 : ((x === m + 1 || x === m - 1) ? 1 : 2)
        laths.push({
          name: 'Pfeiler Links',
          a: [x, abstand_pfeiler, z1],
          b: [x, abstand_pfeiler, dz]
        })
        laths.push({
          name: 'Pfeiler Rechts',
          a: [x, dy - abstand_pfeiler, z1],
          b: [x, dy - abstand_pfeiler, dz]
        })
      }
    }
    for (let x = 1; x < t-1; x++) {
      if (x % 2 === 0) {
        laths.push({
          name: 'Fach',
          a: [x, abstand_pfeiler - 1, 2],
          b: [x, dy - abstand_pfeiler + 1, 2]
        })
      }
    }

    return laths
  }
}
