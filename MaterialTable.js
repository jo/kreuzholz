import { length, f, lathId, schema } from './utils.js'

const highlightColor = `#${schema.highlight.toString(16)}`

export class MaterialTable {
  constructor (element, onLathSelect) {
    this.onLathSelect = onLathSelect
    element.innerHTML = ''
    this.element = d3.select(element)
    const table = this.element.append('table')

    const thead = table.append('thead')
    this.tbody = table.append('tbody')
    this.columns = ['x', 'name', 'length', 'y', 'z']

    thead.append('tr')
      .selectAll('th')
      .data(this.columns)
      .enter().append('th')
        .text(d => d)
  }
  
  render ({ q1, q2, laths }) {
    this.q1 = q1
    this.q2 = q2
    this.laths = laths
    const data = laths.map(l => {
      const x = l.a[0]
      const y = f(q2*l.a[1])
      const z = f(q2*l.a[2])
      const len = length(l)
      return {
        ...l,
        id: lathId(l),
        x,
        y,
        z,
        length: f(q2*len),
      }
    })
    this.data = data
    window.data = data
    this.update(this.data)
  }


  update (laths) {
    const rows = this.tbody.selectAll('tr')
      .data(laths, d => d.id)

    const rowsEnter = rows
      .enter().append('tr')
    rows.exit().remove()

    const allRows = rows.merge(rowsEnter)
//      .style('color', d => d.a[0] % 2 === 0 ? `#${schema.even.toString(16)}` : 'black')
      .on('click', this.onLathSelect)

    const cells = allRows.selectAll('td')
      .data(row => {
        return this.columns.map(column => {
          return {
            column,
            value: row[column]
          }
        })
      }, d => d.column)

    const newCells = cells.enter()
      .append('td')
    cells.exit().remove()

    cells.merge(newCells)
        .text(function (d) { return d.value })

    this.allRows = allRows
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

    this.update(data)
  }
  
  selectLaths (laths) {
    this.allRows.style('background-color', d => laths.find(l => l.id === d.id) ? highlightColor : 'transparent')
  }
}
