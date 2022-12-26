export class LayerForm {
  constructor (form, onchange) {
    form.innerHTML = ''
    const p = document.createElement('p')

    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = '2 or 6,7,8 or 2-8'
    p.appendChild(this.input)

    form.appendChild(p)
    form.onchange = () => onchange(this.serialize())

    onchange(this.serialize())
  }

  serialize () {
    const value = this.input.value

    let layer = null
    let layers = null
    let min = null
    let max = null

    if (value.match('-')) {
      const parts = value.split(/\s*-\s*/)
      min = parts[0]
      max = parts[1]
    } else if (value.match(',')) {
      layers = value.split(/\s*,\s*/).map(n => parseInt(n, 10))
    } else if (value.match(/\d+/)) {
      layer = parseInt(value, 10)
    }

    return {
      layer,
      layers,
      min,
      max
    }
  }
}
