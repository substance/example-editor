import { Component } from 'substance'

export default class ExampleArticleComponent extends Component {

  render($$) {
    const exampleArticle = this.props.node
    const doc = this.props.node.getDocument()
    let el = $$('div')
      .addClass('sc-example-article')
      .attr('data-id', exampleArticle.id)

    const title = doc.get(exampleArticle.title)
    const body = doc.get(exampleArticle.body)

    el.append($$(this.getComponent('title'), {
      node: title
    }).ref('title'))

    el.append($$(this.getComponent('body'), {
      node: body
    }).ref('body'))
    return el
  }

}
