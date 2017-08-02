import { Component, ContainerEditor } from 'substance'

export default class BodyComponent extends Component {

  render($$) {
    const body = this.props.node
    let el = $$('div')
      .addClass('sc-body')
      .attr('data-id', body.id)

    let bodyEl = $$(ContainerEditor, {
      name: 'bodyEditor',
      node: body,
      disabled: this.props.disabled
    })
    el.append(bodyEl)
    return el
  }

}
