import { Designs } from './designs/index.js'

export class DesignList {
  constructor (form, onchange) {
    this.node = form

    form.onchange = () => onchange(this.serialize())

    onchange(this.serialize())
  }

  serialize () {
    return {
      design: null
    }
  }
}
