import { Model, useRepo } from "pinia-orm"

export default class Configuration extends Model {
  static entity = "configurations";
 
  static fields() {
    return {
      id: this.uid("default"),
      updated: this.attr(),
      cols: this.attr(16),
      rows: this.attr(18),
      rule: this.attr(110),
      canvasWidth: this.attr(),
      canvasHeight: this.attr(),
      canvasColor: this.attr("#871212"),
      elementSpacing: this.attr(20),
      elementShape: this.attr(),
      elementColor: this.attr("#90c5df"),
      elementColorMode: this.attr(),
      elementWidth: this.attr(15),
      elementHeight: this.attr(15),
      pixiDivBackgroundColor: this.attr("#221529"),
      randomStartRow: this.attr(true)
    };
  }

  static loadConfig(window, id = "default"){

    useRepo(Configuration).save({
      id: id,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight - window.innerHeight / 2,
    })
    return Configuration.find(id)
  }

  static find(id) {
    return useRepo(Configuration).find(id)
  }
  static save(data) {
    return useRepo(Configuration).save(data)
  }
  static update(data) {
    data.updated = Date.now()
    useRepo(Configuration).save(data)
  }
}
