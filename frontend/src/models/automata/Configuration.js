import { Model, useRepo } from "pinia-orm"

export default class Configuration extends Model {
  static entity = "configurations";
 
  static fields() {
    return {
      id: this.uid("default"),
      updated: this.attr(),
      cols: this.attr(),
      rows: this.attr(),
      rule: this.attr(58),
      canvasWidth: this.attr(),
      canvasHeight: this.attr(),
      canvasColor: this.attr("#594f4f"),
      pixiDivBackgroundColor: this.attr("#221529"),
      elementSpacing: this.attr(40),
      elementShape: this.attr(),
      elementColor: this.attr("#000000"),
      elementColorMode: this.attr(),
      elementWidth: this.attr(30),
      elementHeight: this.attr(30)
    };
  }

  static loadConfig(window, id = "default"){

    useRepo(Configuration).save({
      id: id,
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight - window.innerHeight / 4,
    })
    return Configuration.find(id)
  }

  static find(id) {
    return useRepo(Configuration).find(id)
  }
  static save(data) {
    return useRepo(Configuration).save(data)
  }
}
