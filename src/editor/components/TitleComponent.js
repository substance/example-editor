import { Component, TextPropertyEditor } from 'substance'

export default class TitleComponent extends Component {

  render($$) {
    const title = this.props.node
    let el = $$('div')
      .addClass('sc-title')
      .attr('data-id', title.id)

    let titleEl = $$(TextPropertyEditor, {
      name: 'titleEditor',
      placeholder: 'Enter Title',
      path: title.getTextPath(),
      disabled: this.props.disabled
    }).addClass('se-title-editor').ref('titleEditor')
    el.append(titleEl)

    return el
  }

}
