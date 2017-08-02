import { ToggleTool } from 'substance'

/**
  Tool for editing an existing hyperlink.
  Designed so that it can be used either in a toolbar, or within
  an overlay on the Surface.
  @component
*/

class EditHyperlinkTool extends ToggleTool {

  getUrlPath() {
    let propPath = this.constructor.urlPropertyPath
    return [this.getNodeId()].concat(propPath)
  }

  getNodeId() {
    return this.props.commandState.nodeId
  }

  _openLink() {
    let doc = this.context.editorSession.getDocument()
    window.open(doc.get(this.getUrlPath()), '_blank')
  }

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let commandState = this.props.commandState
    let el = $$('div').addClass('sc-edit-hyperlink-tool')

    // GUARD: Return if tool is disabled
    if (commandState.disabled) {
      console.warn('Tried to render EditLinkTool while disabled.')
      return el
    }

    let urlPath = this.getUrlPath()

    el.append(
      $$(Input, {
        type: 'url',
        path: urlPath,
        placeholder: 'Paste or type a link url'
      }),
      $$(Button, {
        icon: 'open-hyperlink',
        theme: 'dark',
      }).on('click', this._openLink),

      $$(Button, {
        icon: 'delete',
        theme: 'dark',
      }).on('click', this.onDelete)
    )
    return el
  }

  onDelete(e) {
    e.preventDefault();
    let nodeId = this.getNodeId()
    let sm = this.context.surfaceManager
    let surface = sm.getFocusedSurface()
    if (!surface) {
      console.warn('No focused surface. Stopping command execution.')
      return
    }
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx, args) {
      tx.delete(nodeId)
      return args
    })
  }
}

EditHyperlinkTool.urlPropertyPath = ['url']

export default EditHyperlinkTool