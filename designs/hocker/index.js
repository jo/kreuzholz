export class Hocker {
  render ({ dx, dy, dz }) {
    const laths = []

    const b = dy;
    const tn = dx;
    const h = dz;
    const h1 = 1.4*h;

    for (let i = 0; i <= tn; i++) {
      if (i % 2 == 0) {
        laths.push({
          name: 'A',
          a: [i, 0, h],
          b: [i, b, h]
        })
      } else {
        laths.push({
          name: 'B',
          a: [i, 0, 0],
          b: [i, b, h]
        })
        laths.push({
          name: 'C',
          a: [i, 0, h],
          b: [i+0.5, b, 0]
        })
      }
    }

    return laths
  }
}
