export class Pflanzparaventecke {
  defaults () {
    return {
      lath: '38x58',
      dx: 50,
      dy: 120,
      dz: 160
    }
  }
  horizontal () {
    return true
  }

  render ({ q1, q2, dx, dy, dz }) {
    const laths = []
    const z1 = 5
    const zlast = dz - 3
    // const m = 1/3
    const m = 1/2
    const layerMid = 3

    const level = (height, tiefe) => {
      for (let z = 0; z < tiefe; z++) {
        laths.push({
          name: 'y 1 normal waagerecht 1',
          a: [0, 0, height + z],
          b: [0, dy, height + z]
        })
      }
      for (let z = 0; z <= tiefe; z++) {
        laths.push({
          name: 'x 1 skewed waagerecht',
          a: [1, 0, height + z*(q1/q2)],
          b: [dx, 0, height + z*(q1/q2)]
        })
      }

      const layerMid = 3;
      const heighto = layerMid*m
      for (let i = 1; i < 2*layerMid; i++) {
        const zm = i > layerMid ? (- heighto + (i - layerMid)*m) : -i*m

        if (i % 2 === 0) {
          laths.push({
            name: 'y 2 normal waagerecht',
            a: [i, i, height + zm],
            b: [i, dy, height + zm]
          })
          laths.push({
            name: 'x 2 skewed waagerecht',
            a: [1 + i*(q1/q2), i, height + zm],
            b: [dx, i, height + zm]
          })
          laths.push({
            name: 'Füllung dy Ende senkrecht',
            a: [i, dy, height + zm],
            b: [i, dy, height + tiefe - 1]
          })
          laths.push({
            name: 'Füllung dx Ende senkrecht',
            a: [(q2/q1)*dx, i, height + zm],
            b: [(q2/q1)*dx, i, height + tiefe - 1]
          })
        } else {
          if (i === 1) {
            laths.push({
              name: 'y 2 normal waagerecht',
              a: [i, i + 1, height + zm],
              b: [i, dy-1, height + zm]
            })
          } else if (i === 2*layerMid - 1) {
            laths.push({
              name: 'y 2 normal waagerecht',
              a: [i, i, height + zm],
              b: [i, dy-1, height + zm]
            })
          } else {
            laths.push({
              name: 'y 2 normal waagerecht',
              a: [i, i, height + zm],
              b: [i, dy-1, height + zm]
            })
          }
          if (i === 2*layerMid - 1) {
            laths.push({
              name: 'x 2 skewed waagerecht',
              a: [1 + (i+2)*(q1/q2), i, height + zm],
              b: [dx - (q1/q2), i, height + zm]
            })
          } else {
            laths.push({
              name: 'x 2 skewed waagerecht',
              a: [1 + i*(q1/q2), i, height + zm],
              b: [dx - (q1/q2), i, height + zm]
            })
          }
        }
      }

      for (let z = 0; z < tiefe; z++) {
        laths.push({
          name: 'Rückwand Front',
          a: [2*layerMid, 2*layerMid - 1, height + z],
          b: [2*layerMid, dy, height + z]
        })
      }
      for (let z = 0; z <= tiefe; z++) {
        laths.push({
          name: 'Rückwand Seite',
          a: [1 + (2*layerMid)*(q1/q2), 2*layerMid, height + z*(q1/q2)],
          b: [dx, 2*layerMid, height + z*(q1/q2)]
        })
      }

      // laths.push({
      //   name: 'ecke kurzer Stützpfeiler',
      //   a: [2*layerMid + 1, 2*layerMid - 1, height],
      //   b: [2*layerMid + 1, 2*layerMid - 1, height + tiefe - 1]
      // })
    }

    const z1o = layerMid*m
    for (let i = 1; i < 2*layerMid; i++) {
      const zm = i > layerMid ? (- z1o + (i - layerMid)*m) : -i*m

      if (i % 2 !== 0) {
        if (i === 1 || i === 2*layerMid-1) {
          laths.push({
            name: 'z 2 senkrecht',
            a: [i, dy, 0],
            b: [i, dy, dz]
          })
          laths.push({
            name: 'z 2 senkrecht',
            a: [(q2/q1)*dx, i, 0],
            b: [(q2/q1)*dx, i, dz]
          })
        } else {
          laths.push({
            name: 'z 2 senkrecht',
            a: [(q2/q1)*dx, i, z1 + zm],
            b: [(q2/q1)*dx, i, dz]
          })
        }
        if (i === 1) {
          laths.push({
            name: 'z 2 senkrecht',
            a: [i, 1, 0],
            b: [i, 1, dz]
          })
        } else if (i === 2*layerMid - 1) {
          laths.push({
            name: 'Stützpfeiler Ecke',
            a: [i + 2, i, 0],
            b: [i + 2, i, dz]
          })
        } else {
          laths.push({
            name: 'z 2 senkrecht',
            a: [i, dy, z1 + zm],
            b: [i, dy, dz]
          })
        }
      }
    }

    level(z1, 3)
    level(13, 2)
    level(19, 3)
    level(zlast, 4)

    return laths
  }
}
