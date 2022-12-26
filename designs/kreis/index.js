export class Kreis {
  defaults () {
    return {
      lath: '17x30',
      dx: 30,
      dy: 30,
      dz: 2
    }
  }

  render ({ dx, dy, dz }) {
    const m = dy/2

    const laths = []
    for (let x = 0; x < dx; x++) {
      const al = Math.PI * x / dx
      const dd = m - Math.sin(al) * m

      if (x % 2 === 0) {
        laths.push({
          name: 'Oben',
          a: [x, dd, dz],
          b: [x, dy-dd, dz]
        })
      } else {
        laths.push({
          name: 'Links',
          a: [x, dd, 0],
          b: [x, dd, dz]
        })
        laths.push({
          name: 'Rechts',
          a: [x, dy-dd, 0],
          b: [x, dy-dd, dz]
        })
      }
    }
    return laths
  }
}
