export default {

  type: 'hyperlink',
  tagName: 'hyperlink',

  import: function(el, node) {
    node.url = el.attr('href')
    node.title = el.attr('title')
  },

  export: function(link, el) {
    el.attr({
      href: link.url,
      title: link.title
    })
  },

  matchElement: function(el) {
    return el.is('hyperlink, a')
  }
  
}