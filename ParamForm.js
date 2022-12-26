import { Laths } from './laths/index.js'

const f = d3.format(".2f")

const renderFormInput = ({ name, title, value, unit, select }) => {
  const p = document.createElement('p')
  const label = document.createElement('label')
  label.innerText = title
  label.setAttribute('for', name)
  p.appendChild(label)
  const input = document.createElement('input')
  input.value = value
  input.name = name
  input.id = name
  input.type = 'number'
  input.setAttribute('min', 7)
  input.setAttribute('max', 300)
  input.setAttribute('step', 0.1)
  p.appendChild(input)
  const output = document.createElement('output')
  const paramChange = () => {
    const lathId = select.value
    const lath = Laths.find(l => l.id === lathId)
    const q = lath[unit]
    const n = Math.round(input.value / q)
    const eff = n * q
    output.value = `(${n}*${q}=${f(eff)}cm)`
  }
  input.onchange = paramChange
  paramChange()
  p.appendChild(output)
  return p
}

export class ParamForm {
  constructor (form, defaults, onchange) {
    form.innerHTML = ''
    defaults.lath = defaults.lath || '17x30'
    defaults.dx = 'dx' in defaults ? defaults.dx : 26
    defaults.dy = 'dy' in defaults ? defaults.dy : 21
    defaults.dz = 'dz' in defaults ? defaults.dz : 27

    const p = document.createElement('p')
    const label = document.createElement('label')
    label.innerText = 'Lath'
    label.setAttribute('for', 'lath')
    p.appendChild(label)
    const select = document.createElement('select')
    select.id = 'lath'
    for (const lath of Laths) {
      const option = document.createElement('option')
      option.value = lath.id
      option.innerText = `${lath.id} ${lath.title}`
      option.selected = lath.id === defaults.lath
      select.appendChild(option)
    }
    p.appendChild(select)
    this.lathSelect = select
    const img = document.createElement('img')
    const lathChange = () => {
      img.src = `./laths/${select.value}/icon.jpg`
    }
    select.onchange = lathChange
    lathChange()
    p.appendChild(img)
    form.appendChild(p)

    const px = renderFormInput({ name: 'dx', title: 'Depth', value: defaults.dx, unit: 'q1', select })
    form.appendChild(px)
    const py = renderFormInput({ name: 'dy', title: 'Width', value: defaults.dy, unit: 'q2', select })
    form.appendChild(py)
    const pz = renderFormInput({ name: 'dz', title: 'Height', value: defaults.dz, unit: 'q2', select })
    form.appendChild(pz)

    this.node = form

    form.onchange = () => onchange(this.serialize())

    onchange(this.serialize())
  }

  serialize () {
    const lathId = this.lathSelect.value
    const lath = Laths.find(l => l.id === lathId)

    return {
      lath,
      dx: Math.round(this.node.dx.value / lath.q1),
      dy: Math.round(this.node.dy.value / lath.q2),
      dz: Math.round(this.node.dz.value / lath.q2)
    }
  }
}
