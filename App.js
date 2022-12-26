import { Session } from './Session.js'
import { DesignForm } from './DesignForm.js'
import { ParamForm } from './ParamForm.js'
import { LayerForm } from './LayerForm.js'
import { Bom } from './Bom.js'
import { Stats } from './Stats.js'
import { MaterialTable } from './MaterialTable.js'
import { Code } from './Code.js'
import { View } from './View.js'
import { Plan } from './Plan.js'
import { Anschlag } from './Anschlag.js'

export class App {
  constructor ({ layout }) {
    this.layout = layout
    this.session = new Session(document.body)

    const onLathSelect = (e, d) => {
      const laths = d.laths || [d]
      this.table.selectLaths(laths)
      this.bom.selectLaths(laths)
      this.plan.selectLaths(laths)
      this.anschlag.selectLaths(laths)
      this.view.selectLaths(laths)
    }

    this.plan = new Plan(this.layout.plan, onLathSelect)
    this.stats = new Stats(this.layout.stats)
    this.bom = new Bom(this.layout.bom, onLathSelect)
    this.table = new MaterialTable(this.layout.table, onLathSelect)
    this.code = new Code(this.layout.code)
    this.view = new View(this.layout.view)
    this.anschlag = new Anschlag(this.layout.anschlag)
  }

  init () {
    const onDesignChange = ({ Design }) => {
      const design = new Design()
      this.code.update(Design)
      const onParamsChange = params => {
        const laths = design.render({
          ...params,
          q1: params.lath.q1,
          q2: params.lath.q2
        })
        this.stats.render({ lath: params.lath, laths })
        this.bom.render({
          q1: params.lath.q1,
          q2: params.lath.q2,
          laths
        })
        this.table.render({
          q1: params.lath.q1,
          q2: params.lath.q2,
          laths
        })
        this.view.render({
          horizontal: typeof design.horizontal === 'function' ? design.horizontal() : false,
          q1: params.lath.q1,
          q2: params.lath.q2,
          laths
        })
        this.plan.render({
          q1: params.lath.q1,
          q2: params.lath.q2,
          laths
        })
      }
      const defaults = design.defaults ? design.defaults() : {}
      const paramsForm = new ParamForm(this.layout.paramsForm, defaults, onParamsChange)
      const onLayerChange = layer => {
        this.bom.updateLayer(layer)
        this.table.updateLayer(layer)
        this.view.updateLayer(layer)
      }
      const layerForm = new LayerForm(this.layout.layerForm, onLayerChange)
    }

    const designForm = new DesignForm(this.layout.designForm, onDesignChange, this.session)
  }
}
