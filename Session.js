const DEFAULTS = {
  design: 'Kubus',
  details: {
    'design-form': true,
    'params-form': true,
    'stats': true,
    'layer-form': true,
    'bom': true,
    'view': true,
    'plan': false,
    'table': false
  }
}

export class Session {
  constructor (body) {
    const stored = localStorage.getItem('session')
    const json = stored && JSON.parse(stored)
    this.data = json || DEFAULTS

    const details = document.querySelectorAll('details')
    for (const detail of details) {
      const id = detail.id
      const key = id.replace(/-details/, '')
      const summary = detail.querySelector('summary')
      summary.onclick = e => {
        this.data.details[key] = !detail.open
        this.save()
      }
      detail.open = this.data.details[key]
    }
  }

  save () {
    localStorage.setItem('session', JSON.stringify(this.data))
  }

  get design () {
    return this.data.design
  }
}
