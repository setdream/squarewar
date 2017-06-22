export default class ViewRepositary {
  data = {};
  
  find(id) {
    return this.data[id];
  }

  add(element) {
    this.data[element.id] = element;
  }
}