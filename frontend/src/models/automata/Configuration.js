import { Model, useRepo } from "pinia-orm"

export default class Configuration extends Model {
  static entity = "configurations";
 
  static fields() {
    return {
      id: this.uid(),
      cols: this.attr(),
      rows: this.attr(),
      rule: this.attr(58),
      canvasWidth: this.attr(),
      canvasHeight: this.attr(),
      canvasColor: this.attr("#594f4f"),
      pixiDivBackgroundColor: this.attr("#221529"),
      elementSpacing: this.attr(),
      elementShape: this.attr(),
      elementColor: this.attr("#594f4f"),
      elementColorMode: this.attr(),
      elementWidth: this.attr(8),
      elementHeight: this.attr(8)
    };
  }

  static loadConfig(window){
    useRepo(Configuration).save({
      id: "default",
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight - window.innerHeight / 4,
      elementSpacing: 10
    })
  }

  static find(id) {
    return useRepo(Configuration).find(id)
  }
  static save(data) {
    return useRepo(Configuration).save(data)
  }
}
