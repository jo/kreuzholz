import { length, f, lathId, schema } from './utils.js'

const color = (d, idx) => {
  if (d.a[0] % 2 === 0) return `#${schema.even.toString(16)}`
  return `#${schema.odd.toString(16)}`
}

const highlightColor = `#${schema.highlight.toString(16)}`

export class Plan {
  constructor (element, onLathSelect) {
    this.onLathSelect = onLathSelect
    this.svg = d3.select(element)

    this.front = this.svg.append('g')
      .classed('front', true)

    this.side = this.svg.append('g')
      .classed('side', true)

    this.topView = this.svg.append('g')
      .classed('top', true)
  }

  render ({ q1, q2, laths }) {
    const data = laths
      .map(d => {
        const len = length(d)
        return {
          ...d,
          id: lathId(d),
          x: d.a[0]*q1 - q1/2,
          y: d.a[1]*q2 - q2/2,
          z: d.a[2]*q2 - q2/2,
          length: f(q2*len),
          x2: d.b[0]*q1 + q1/2,
          y2: d.b[1]*q2 + q2/2,
          z2: d.b[2]*q2 + q2/2,
          width: d.b[1]*q2 - d.a[1]*q2 + q2,
          height: d.b[2]*q2 - d.a[2]*q2 + q2,
          depth: d.b[0]*q1 - d.a[0]*q1 + q1
        }
      })
    this.data = data

    // TODO
    const maxX = d3.max(data, d => Math.max(d.x, d.x2))
    const maxY = d3.max(data, d => Math.max(d.y, d.y2))
    const maxZ = d3.max(data, d => Math.max(d.z, d.z2))

    const width = maxY + maxX + 30
    const height = maxZ + maxX + 30
    
    const frontLathsHeight = maxZ
    const sideLathsHeight = maxZ
    const topLathsHeight = maxX

    this.svg.attr('viewBox', `0 0 ${width} ${height}`)
    this.front.attr('transform', 'translate(10, 10)')
    this.side.attr('transform', `translate(${maxY + 20}, 10)`)
    this.topView.attr('transform', `translate(10, ${maxZ + 20})`)

    const cut = 0.05
    const idx = 0

    const frontLaths = this.front.selectAll('rect')
          .data(data, d => d.id)
    const frontLathsEnter = frontLaths.enter().append('rect')
    const allFrontLaths = frontLaths.merge(frontLathsEnter)
    allFrontLaths
        .attr('x', d => d.y + cut)
        .attr('y', d => maxZ - d.height - d.z + cut)
        .attr('width', d => d.width - 2*cut)
        .attr('height', d => d.height - 2*cut)
        .attr('fill', d => color(d, idx))
        .on('click', this.onLathSelect)
    frontLaths
        .attr('x', d => d.y + cut)
        .attr('y', d => maxZ - d.height - d.z + cut)
        .attr('width', d => d.width - 2*cut)
        .attr('height', d => d.height - 2*cut)
        .attr('fill', d => color(d, idx))
        .on('click', this.onLathSelect)
    frontLaths.exit().remove()


    const sideLaths = this.side.selectAll('rect')
          .data(data, d => d.id)
    const sideLathsEnter = sideLaths.enter().append('rect')
    const allSideLaths = sideLaths.merge(sideLathsEnter)
    allSideLaths
        .attr('x', d => d.x + cut)
        .attr('y', d => maxZ - d.height - d.z + cut)
        .attr('width', d => d.depth - 2*cut)
        .attr('height', d => d.height - 2*cut)
        .attr('fill', d => color(d, idx))
        .on('click', this.onLathSelect)
    sideLaths.exit().remove()

    const topLaths = this.topView.selectAll('rect')
          .data(data, d => d.id)

    const topLathsEnter = topLaths.enter().append('rect')
    const allTopLaths = topLaths.merge(topLathsEnter)

    allTopLaths
        .attr('x', d => d.y + cut)
        .attr('y', d => d.x + cut)
        .attr('width', d => d.width - 2*cut)
        .attr('height', d => d.depth - 2*cut)
        .attr('fill', d => color(d, idx))
        .on('click', this.onLathSelect)
    
    topLaths.exit().remove()
    this.allFrontLaths = allFrontLaths
    this.allSideLaths = allSideLaths
    this.allTopLaths = allTopLaths
  }
  
  selectLaths (laths) {
    const idx = 0
    this.allFrontLaths.style('fill', d => laths.find(l => l.id === d.id) ? highlightColor : color(d, idx))
    this.allSideLaths.style('fill', d => laths.find(l => l.id === d.id) ? highlightColor : color(d, idx))
    this.allTopLaths.style('fill', d => laths.find(l => l.id === d.id) ? highlightColor : color(d, idx))
  }
}
