import { f } from './utils.js'

// const anschlagUrl = 'http://192.168.178.48:8080'
const anschlagUrl = ''
// const anschlagUrl = 'http://localhost:8080'

export class Anschlag {
  constructor (form) {
    form.innerHTML = ''
    const p = document.createElement('p')

    this.input = document.createElement('input')
    this.input.type = 'number'
    // this.input.disabled = true
    this.input.value = 0
    this.input.setAttribute('step', 0.01)
    p.appendChild(this.input)

    this.offsetInput = document.createElement('input')
    this.offsetInput.type = 'number'
    // this.offsetInput.disabled = true
    this.offsetInput.value = 0
    p.appendChild(this.offsetInput)

    this.output = document.createElement('output')
    this.output.value = 0
    p.appendChild(this.output)

    let lastPos = null
    let timeout = null
    const updateOutput = async () => {
      if (timeout) clearTimeout(timeout)
      const resp = await fetch(`${anschlagUrl}/info`, {
        json: true,
        cors: true
      })
      const { position } = await resp.json()
      this.output.value = f(position)
      if (lastPos != position) timeout = setTimeout(updateOutput, 1000)
      lastPos = position
    }

    this.play = document.createElement('button')
    this.play.innerText = ' ▶'
    // this.play.disabled = true
    this.play.onclick = async () => {
      const position = parseFloat(this.input.value)
      const offset = parseFloat(this.offsetInput.value)
      console.log('go to', position, offset)
      const resp = await fetch(`${anschlagUrl}/go`, {
        method: 'post',
        json: true,
        body: JSON.stringify({ position, offset })
      })
      updateOutput()
    }
    p.appendChild(this.play)

    this.stop = document.createElement('button')
    this.stop.innerText = '⏹'
    // this.stop.disabled = true
    this.stop.onclick = async () => {
      console.log('stop')
      const resp = await fetch(`${anschlagUrl}/stop`, {
        method: 'post',
        json: true
      })
      updateOutput()
    }
    p.appendChild(this.stop)

    this.reset = document.createElement('button')
    this.reset.innerText = ' ⏮'
    // this.reset.disabled = true
    this.reset.onclick = async () => {
      console.log('reset')
      const resp = await fetch(`${anschlagUrl}/reset`, {
        method: 'post',
        json: true
      })
      updateOutput()
    }
    p.appendChild(this.reset)

    // TODO: disabled by now
    // updateOutput()

    form.appendChild(p)
  }
  
  selectLaths (laths) {
    const [{ length }] = laths
    this.input.value = length
  }
}
