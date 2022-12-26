import { Session } from '../Session.js'
import { ParamForm } from '../ParamForm.js'
import { View } from '../View.js'
import { Brotkasten } from '../designs/brotkasten/index.js'

export class App {
  constructor ({ layout }) {
    this.layout = layout
    this.session = new Session(document.body)
    this.view = new View(this.layout.view)
  }

  init () {
    const design = new Brotkasten()
    const laths = design.render({
      dx: 26,
      dy: 21,
      dz: 27
    })
    this.view.render({
      horizontal: typeof design.horizontal === 'function' ? design.horizontal() : false,
      q1: 2,
      q2: 3,
      laths
    })
  }
}
