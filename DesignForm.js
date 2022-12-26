import { Designs } from './designs/index.js'

export class DesignForm {
  constructor (form, onchange, session) {
    this.session = session
    const p = document.createElement('p')
    // const label = document.createElement('label')
    // label.innerText = 'Design'
    // label.setAttribute('for', 'design')
    // p.appendChild(label)
    this.select = document.createElement('select')
    this.select.id = 'design'
    for (const design of Designs) {
      const option = document.createElement('option')
      option.value = design.name
      option.innerText = design.name
      option.selected = this.session.data.design === design.name
      this.select.appendChild(option)
    }
    p.appendChild(this.select)
    form.appendChild(p)

    form.onchange = () => {
      const attrs = this.serialize()
      this.session.data.design = attrs.Design.name
      this.session.save()
      onchange(attrs)
    }

    onchange(this.serialize())
  }

  serialize () {
    const name = this.select.value
    const Design = Designs.find(D => D.name === name)
    return {
      Design
    }
  }
}
