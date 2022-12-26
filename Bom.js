import { length, f, lathId, schema } from './utils.js'

const highlightColor = `#${schema.highlight.toString(16)}`

export class Bom {
  constructor (element, onLathSelect) {
    this.onLathSelect = onLathSelect
    element.innerHTML = ''
    this.element = d3.select(element)
    const table = this.element.append('table')

    const thead = table.append('thead')
    this.tbody = table.append('tbody')
    this.columns = ['cnt', 'length', 'layers', 'names']

    thead.append('tr')
      .selectAll('th')
      .data(this.columns)
      .enter().append('th')
        .text(d => d)
  }
  
  render ({ q1, q2, laths }) {
    const data = laths.map(l => {
      const x = l.a[0]
      const y = f(q2*l.a[1])
      const z = f(q2*l.a[2])
      const len = length(l)
      return {
        ...l,
        x,
        y,
        z,
        id: lathId(l),
        length: f(q2*len)
      }
    })
    this.data = data
    this.update({ laths: this.data })
  }


  update ({ laths }) {
    const byLength = laths
      .reduce((memo, l) => {
        const key = l.length.toString()
        memo[key] = memo[key] || { laths: [], length: l.length, cnt: 0, names: [], layers: [] }
        memo[key].laths.push(l)
        memo[key].cnt += 1
        if (memo[key].names.indexOf(l.name) === -1) memo[key].names.push(l.name)
        if (memo[key].layers.indexOf(l.x) === -1) memo[key].layers.push(l.x)
        return memo
      }, {})


    const lengths = Object.values(byLength)
      .sort((a, b) => a.length - b.length)
      .map(l => {
        return {
          ...l,
          names: l.names.sort().join(', '),
          layers: l.layers.join(', ')
        }
      })
    const rows = this.tbody.selectAll('tr')
      .data(lengths, d => d.length)

    const rowsEnter = rows
      .enter().append('tr')
    rows.exit().remove()

    const allRows = rows.merge(rowsEnter)
    allRows.on('click', this.onLathSelect)

    const cells = allRows.selectAll('td')
      .data(row => {
        return this.columns.map(column => {
          return {
            column,
            value: row[column]
          }
        })
      })

    const newCells = cells.enter()
      .append('td')

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

    this.update({ laths: data })
  }
  
  selectLaths (laths) {
    this.allRows.style('background-color', d => laths.find(l => l.length === d.length) ? highlightColor : 'transparent')
  }
}
