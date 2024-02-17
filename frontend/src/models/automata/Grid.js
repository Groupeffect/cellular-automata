import { Model, useRepo } from "pinia-orm"

export default class Grid extends Model {
  static entity = "grids";
 
  static fields() {
    return {
      id: this.uid("default"),
      updated: this.attr(),
      grid: this.attr(),
      cols: this.attr(),
      rows: this.attr(),
      rule: this.attr(),
      mapping: this.attr(),
      neighborIndexes: this.attr(),
      startTraining: this.attr(),
    };
  }

  static loadConfig(window, id = "default"){
    useRepo(Grid).save({
      id: id,
    })
    return Grid.find(id)
  }
  static find(id) {
    return useRepo(Grid).find(id)
  }
  static save(data) {
    return useRepo(Grid).save(data)
  }
  static update(data) {
    data.updated = Date.now()
    useRepo(Grid).save(data)
  }
}
