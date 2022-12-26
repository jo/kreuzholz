export class Code {
  constructor (element) {
    const pre = document.createElement('textarea')
    element.appendChild(pre)
    this.pre = pre
  }

  update (design) {
    window.design = design
    this.pre.value = design.toString()
  }
}
