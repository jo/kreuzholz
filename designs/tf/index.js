export class TF {
  render ({ q1, q2, dx, dy, dz }) {
    dx = Math.round(dx/q1)*q1
    dy = Math.round(dy/q2)*q2
    dz = Math.round(dz/q2)*q2
    const ddy = Math.round(dy/4)
    const ddy1 = ddy + Math.round(dy/3)
    const ddz = Math.round(dz/2.27)
    const laths = []
    for (let x = 0; x < dx; x++) {
      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, 0, dz],
          b: [x, dy, dz]
        })
        laths.push({
          name: 'Mitte',
          a: [x, ddy1, ddz],
          b: [x, dy - 1, ddz]
        })
        laths.push({
          name: 'Links Füllung',
          a: [x, ddy, 0],
          b: [x, ddy, dz-1]
        })
        laths.push({
          name: 'Rechts Füllung Unten',
          a: [x, ddy1, 0],
          b: [x, ddy1, ddz-1]
        })
        laths.push({
          name: 'Rechts Füllung Oben',
          a: [x, ddy1, ddz+1],
          b: [x, ddy1, dz-1]
        })
      } else {
        laths.push({
          name: 'Links',
          a: [x, ddy, 0],
          b: [x, ddy, dz]
        })
        laths.push({
          name: 'Rechts',
          a: [x, ddy1, 0],
          b: [x, ddy1, dz]
        })
        laths.push({
          name: 'Mitte Füllung',
          a: [x, ddy1 + 1, ddz],
          b: [x, dy - 1, ddz]
        })
        laths.push({
          name: 'Oben Füllung Links',
          a: [x, 0, dz],
          b: [x, ddy-1, dz]
        })
        laths.push({
          name: 'Oben Füllung Mitte',
          a: [x, ddy+1, dz],
          b: [x, ddy1-1, dz]
        })
        laths.push({
          name: 'Oben Füllung Rechts',
          a: [x, ddy1+1, dz],
          b: [x, dy, dz]
        })
      }
    }
    return laths
  }
}
