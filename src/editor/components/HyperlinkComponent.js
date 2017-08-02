import { AnnotationComponent } from 'substance'

class HyperlinkComponent extends AnnotationComponent {

  didMount(...args) {
    super.didMount(...args)

    let node = this.props.node
    this.context.editorSession.onRender('document', this.rerender, this, {
      path: [node.id, 'url']
    })
  }

  dispose(...args) {
    super.dispose(...args)

    this.context.editorSession.off(this)
  }

  render($$) {
    let el = super.render($$)

    el.tagName = 'hyperlink'
    el.attr('href', this.props.node.url)

    let titleComps = [this.props.node.url]
    if (this.props.node.title) {
      titleComps.push(this.props.node.title)
    }

    return el.attr('title', titleComps.join(' | '))
  }

}

export default HyperlinkComponent