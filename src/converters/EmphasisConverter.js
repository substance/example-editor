export default {

  type: 'emphasis',
  tagName: 'emphasis',

  matchElement: function(el) {
    return el.is('emphasis, em, i')
  }

}