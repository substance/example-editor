import { NodeComponent } from 'substance'

class FigureComponent extends NodeComponent {

  didMount() {
    super.didMount.call(this)
    this.context.editorSession.onRender('document', this._onDocumentChange, this)
  }

  dispose() {
    super.dispose.call(this)
    this.context.editorSession.off(this)
  }

  _onDocumentChange(change) {
    if (change.hasUpdated(this.props.node.id) ||
      change.hasUpdated(this.props.node.imageSource)) {
      this.rerender()
    }
  }

  render($$) {
    let el = super.render($$)
    el.addClass('sc-figure')
    el.append(
      $$('img').attr({
        src: this.props.node.getImageSource(),
      }).ref('figure')
    )
    return el
  }
}

export default FigureComponent