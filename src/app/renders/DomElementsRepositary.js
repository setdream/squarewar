export default class DomElementsRepositary {
  data = {};
  
  find(id) {
    return this.data[id];
  }

  add(element) {
    this.data[element.id] = element;
  }
}