


function mapStateToProps ({products, categories, checkObject}) {
  return {
    products,
    categories,
    checkObject,
  }
}


this.props.categories.map
  <input checked={checkObject[category.id] || false}/>




---------


a = { key: undefined }
b = {}

a.key === b.key

Object.keys(a) => ['key']
Object.keys(b) => []


render-1
  things = {}
  <input value={things.isOn}/>
  // uncontrolled

render-2
  things = {isOn: true}
  <input value={things.isOn}/>
  // controlled
