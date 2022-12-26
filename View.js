import { lathId, schema } from './utils.js'
import { Lath } from './Lath.js'

const swap = ({ x, y, z }) => {
  return {
    x: y,
    y: x,
    z: z
  }
}

export class View {
  constructor (element) {
    const width = 1350 // element.parentNode.clientWidth - 90 //1220
    const height = 790
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)
    // scene.background = new THREE.Color(0xeeeeee)
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ canvas: element })
    renderer.setSize(width, height)

    const group = new THREE.Group()
    this.group = group

    this.material = new THREE.MeshBasicMaterial({ color: schema.odd })
    this.materialEven = new THREE.MeshBasicMaterial({ color: schema.even })
    this.materialHighlight = new THREE.MeshBasicMaterial({ color: schema.highlight })

    this.outlineMaterial = new THREE.MeshBasicMaterial( { color: schema.edge, side: THREE.BackSide, wireframe: true } );  
    
    scene.add(group)
    camera.position.z = 250

    const size = 300;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions, 0xff0000, 0x000000);
    scene.add( gridHelper );

    this.horizontal = false

    const controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( element ); // optional

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;

				controls.minDistance = 10;
				controls.maxDistance = 700;

				// controls.maxPolarAngle = Math.PI / 2;

    const animate = function () {
      requestAnimationFrame(animate)

      controls.update();

      // group.rotation.x += 0.0001
      // group.rotation.y += 0.0001

      renderer.render(scene, camera)
    }

    animate()
  }

  render ({ horizontal, q1, q2, laths }) {
    this.horizontal = horizontal

    this.data = laths
      .map(d => {
        return {
          ...d,
          id: lathId(d)
        }
      })
    this.q1 = q1
    this.q2 = q2

    this.update({ laths })
  }

  maybeSwap (pos) {
    return this.horizontal ? pos : swap(pos)
  }

  geometry (lath) {
    const geo = lath.geometry

    const s = this.maybeSwap(geo)
    return new THREE.BoxGeometry(s.x, s.y, s.z)
  }

  positionOffset (lath) {
    const offset = lath.offset
    return this.maybeSwap(offset)
  }

  position (lath) {
    const pos = lath.positionAbs

    return this.maybeSwap(pos)
  }

  rotation (lath) {
    const r = lath.rotation
    
    if (this.horizontal) r.x = -1*r.x

    return this.maybeSwap(r)
  }

  update ({ laths }) {
    for (var i = this.group.children.length - 1; i >= 0; i--) {
      this.group.remove(this.group.children[i])
    }
    for (const d of laths) {
      const q1 = this.q1
      const q2 = this.q2
      const { name, a , b } = d
      const lath = new Lath({ name, q1, q2, a, b })

      const g = new THREE.Group()
      const len = lath.lengthAbs
      
      const geometry = this.geometry(lath)
      const positionOffset = this.positionOffset(lath)
      
      const material = d.selected ? this.materialHighlight : (d.a[0] % 2 === 0 ? this.materialEven : this.material)
      const cube = new THREE.Mesh(geometry, material)
      cube.position.x = positionOffset.x
      cube.position.y = positionOffset.y
      cube.position.z = positionOffset.z
      g.add(cube)

      const outlines = new THREE.Mesh(geometry, this.outlineMaterial)
      outlines.position.x = positionOffset.x
      outlines.position.y = positionOffset.y
      outlines.position.z = positionOffset.z
      g.add(outlines)

      const position = this.position(lath)
      g.position.x = position.x
      g.position.y = position.y
      g.position.z = position.z

      const rotation = this.rotation(lath)
      g.rotation.x = rotation.x
      g.rotation.y = rotation.y
      g.rotation.z = rotation.z

      this.group.add(g)
    }
    this.laths = laths
  }

  updateLayer ({ layer, layers, min, max }) {
    let data

    if (layer !== null) {
      data = this.data.filter(d => d.a[0] === layer)
    } else if (layers !== null) {
      data = this.data.filter(d => layers.indexOf(d.a[0]) > -1)
    } else if (min !== null && max !== null) {
      data = this.data.filter(d => d.a[0] >= min && d.a[0] <= max)
    } else {
      data = this.data
    }

    this.update({ laths: data })
  }
  
  selectLaths (laths) {
    const data = this.laths.map(lath => {
      lath.selected = !!laths.find(l => l.id === lath.id)
      return lath
    })
    this.update({ laths: data })
  }
}
