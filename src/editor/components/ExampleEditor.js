import { ScrollPane, AbstractEditor, Toolbar } from 'substance'

/**
  We extend from AbstractEditor which provides an abstract implementation
  that should be feasible for most editors.
*/
export default class Editor extends AbstractEditor {

  render($$) {
    let el = $$('div').addClass('sc-example-editor')
    el.append(
      this._renderToolbar($$),
      this._renderContentPanel($$)
    )
    return el
  }

  _renderToolbar($$) {
    let configurator = this.getConfigurator()
    return $$('div').addClass('se-toolbar-wrapper').append(
      $$(Toolbar, {
        toolPanel: configurator.getToolPanel('toolbar')
      }).ref('toolbar')
    )
  }

  _renderContentPanel($$) {
    const doc = this.editorSession.getDocument()
    const configurator = this.getConfigurator()
    const ExampleArticleComponent = this.getComponent('example-article')
    const Overlay = this.getComponent('overlay')
    const exampleArticle = doc.get('example-article')

    let contentPanel = $$(ScrollPane, {
      tocProvider: this.tocProvider,
      scrollbarType: 'substance',
      scrollbarPosition: 'left',
      highlights: this.contentHighlights,
    }).ref('contentPanel')

    contentPanel.append(
      $$(ExampleArticleComponent, {
        node: exampleArticle,
        disabled: this.props.disabled
      }),
      $$(Overlay, {
        toolPanel: configurator.getToolPanel('main-overlay'),
        theme: 'dark'
      })
    )

    return $$('div').addClass('se-content-panel-wrapper').append(
      contentPanel
    )
  }

  getConfigurator() {
    return this.props.editorSession.configurator
  }

}
