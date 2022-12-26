import { length, f } from './utils.js'

export class Stats {
  constructor (element) {
    element.innerHTML = ''
    this.element = d3.select(element)
  }
  
  render ({ lath, laths }) {
    const data = laths.map(l => {
      return {
        ...l,
        length: lath.q2 * length(l)
      }
    })

    const layers = data.reduce((memo, d) => Math.max(d.a[0]), 0) + 1

    const lengths = data
      .reduce((memo, l) => {
        const key = f(l.length)
        memo[key] = memo[key] || 0
        memo[key] += 1
        return memo
      }, {})

    const pieces = data.length
    const totalLength = data.reduce((memo, l) => memo + l.length, 0)
    const cnt = Math.ceil(totalLength / lath.length)
    const price = cnt * lath.length/100 * lath.price
    const differentLengths = Object.keys(lengths).length
    let work = 0

    // erster kleiner Topf
    // work += 5 // Boden leimen
    // work += 15 // schleifen
    // work += 4 // ölen

    // work += 14/12 * differentLengths // cut
    // work += 12/47 * pieces // putzen
    // work += 8/47 * pieces // sortieren
    // work += 38/47 * pieces // bau


    // länglicher Topf, erste Mal mit Teer
    work += 14/52 * pieces // Zuschnitt
    work += 11 // Boden & erster Layer
    work += 43/9 * (layers - 3) // Montage
    work += 7 // schleifen innen
    work += 16 // GTeer
    work += 7 // Montage Kiel & letzte Ebene &
    work += 13 // schleiffen aussen
    work += 5 // ölen

    const summary = [
      {
        label: 'Pieces',
        value: pieces
      },
      {
        label: 'Lengths',
        value: differentLengths
      },
      {
        label: 'Layers',
        value: layers
      },
      {
        label: 'Total Length [m]',
        value: f(totalLength / 100)
      },
      {
        label: 'Number of Laths',
        value: cnt
      },
      {
        label: 'Price [€]',
        value: f(price)
      },
      {
        label: 'Work [minutes]',
        value: f(work)
      }
    ]
    
    const ps = this.element.selectAll('p')
      .data(summary, d => d.label)

    const psEnter = ps
      .enter().append('p')
    psEnter.append('label')
      .text(d => `${d.label}:`)
    ps.select('label')
      .text(d => `${d.label}:`)
    psEnter.append('output')
      .text(d => d.value)
    ps.select('output')
      .text(d => d.value)
  }
}
