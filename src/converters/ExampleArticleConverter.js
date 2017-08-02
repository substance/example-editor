export default {
  type: 'example-article',
  tagName: 'example-article',

  import: function(el, node, converter) {
    let title = el.find('title')
    let body = el.find('body')

    node.id = 'example-article'
    node.title = converter.convertElement(title).id
    node.body = converter.convertElement(body).id
  },

  export: function(node, el, converter) {
    el.append(converter.convertNodes(node.nodes))
  }
}
