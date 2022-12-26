export class Halbwendeltreppe {
  render ({ dx, dy, dz }) {
    console.log({ dx, dy, dz })
    const laths = [
      { name: 'A', a: [0,0,0], b: [0,2,0] },
    ]
    return laths
  }
}
