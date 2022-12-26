export class Lath {
  constructor ({ q1, q2, name, a, b }) {
    this.q1 = q1
    this.q2 = q2

    this.name = name

    this.a = a
    this.b = b
    
    this.skewed = a[0] !== b[0]

    this.ql = q2
    this.qx = this.skewed ? q2 : q1
    // this.qy = this.skewed ? q1 : q2
    this.qy = q2
    this.qz = q2

    this.ab = [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
    

    console.log(name, this.skewed)
  }

  
  get length () {
    return Math.sqrt(Math.pow(this.ab[0], 2) + Math.pow(this.ab[1], 2) + Math.pow(this.ab[2], 2)) + 1
  }

  get lengthAbs () {
    return this.length * this.ql
  }


  get position () {
    const x = this.a[0]
    const y = this.a[2]
    const z = this.a[1]
    return { x, y, z }
  }

  get positionAbs () {
    const { x, y, z } = this.position

    const diff = this.q2 - this.q1

    return {
      // x: x * this.qx,
      x: this.skewed ? x * this.qx - diff/2 : x * this.qx,
      y: y * this.qy,
      z: z * this.qz
    }
  }


  get offset () {
    return {
      x: 0,
      // y: this.skewed ? this.qy/4 : 0,
      y: 0,
      z: this.lengthAbs / 2 - this.ql/2
    }
  }

  
  get geometry () {
    return {
      x: this.qx,
      y: this.skewed ? this.q1 : this.qy,
      z: this.lengthAbs
    }
  }


  get rotation () {
    const ax = Math.atan(this.ab[2]/this.ab[1])
    const x = isNaN(ax) ? 0 : (this.ab[1] >= 0 ? ax - Math.PI : ax)

    const ay = Math.atan(this.ab[0]/this.ab[2])
    // TODO: apply switch Math.PI offset
    const y = isNaN(ay) ? 0 : -ay
    
    // TODO
    // const az = Math.atan(this.ab[0]/this.ab[1])
    // g.rotation.z = this.ab[1] >= 0 ? -az - Math.PI : -az
    const z = 0

    return { x, y, z }
  }
}
