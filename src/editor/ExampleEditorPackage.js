import {
  BasePackage as SubstanceBasePackage,
  Document as SubstanceDocument,
  AnnotationCommand,
  EditAnnotationCommand,
  SwitchTextTypeCommand,
  XMLImporter
} from 'substance'

import {
  Body,
  ExampleArticle,
  Paragraph,
  Title,
  Figure,
  Caption,
  Emphasis,
  Hyperlink
} from '../nodes'

import {
  BodyConverter,
  ExampleArticleConverter,
  ParagraphConverter,
  TitleConverter,
  FigureConverter,
  CaptionConverter,
  EmphasisConverter,
  HyperlinkConverter
} from '../converters'

import ExampleArticleComponent from './components/ExampleArticleComponent'
import BodyComponent from './components/BodyComponent'
import TitleComponent from './components/TitleComponent'
import ParagraphComponent from './components/ParagraphComponent'
import FigureComponent from './components/FigureComponent'
import EmphasisComponent from './components/EmphasisComponent'
import HyperlinkComponent from './components/HyperlinkComponent'

import ExampleEditor from './components/ExampleEditor'

import HyperlinkCommand from './commands/HyperlinkCommand'
import EditHyperlinkTool from './tools/EditHyperlinkTool'

export default {
  name: 'author',
  configure(config) {
    config.defineSchema({
      name: 'example-article',
      version: '1.0.0',
      DocumentClass: SubstanceDocument,
      defaultTextType: 'paragraph'
    })

    config.import(SubstanceBasePackage)

    // Register Nodes
    config.addNode(ExampleArticle)
    config.addNode(Title)
    config.addNode(Body)
    config.addNode(Paragraph)
    config.addNode(Figure)
    config.addNode(Caption)
    config.addNode(Emphasis)
    config.addNode(Hyperlink)

    // Converters
    config.addConverter('xml', ExampleArticleConverter)
    config.addConverter('xml', TitleConverter)
    config.addConverter('xml', BodyConverter)
    config.addConverter('xml', ParagraphConverter)
    config.addConverter('xml', FigureConverter)
    config.addConverter('xml', CaptionConverter)
    config.addConverter('xml', EmphasisConverter)
    config.addConverter('xml', HyperlinkConverter)

    // TODO: we could make XMLImporter the default
    config.addImporter('xml', XMLImporter)

    // Commands
    config.addCommand('paragraph', SwitchTextTypeCommand, {
      spec: { type: 'paragraph' },
      commandGroup: 'text-types'
    })
    config.addCommand('emphasis', AnnotationCommand, {
      nodeType: 'emphasis',
      commandGroup: 'annotations'
    })
    config.addCommand('hyperlink', HyperlinkCommand, {
      nodeType: 'hyperlink',
      commandGroup: 'annotations'
    })
    config.addCommand('edit-hyperlink', EditAnnotationCommand, {
      nodeType: 'hyperlink',
      commandGroup: 'prompt'
    })

    // Tools
    config.addTool('edit-hyperlink', EditHyperlinkTool)

    // Icons
    config.addIcon('emphasis', {
      fontawesome: 'fa-italic'
    })
    config.addIcon('hyperlink', {
      fontawesome: 'fa-link'
    })
    config.addIcon('open-hyperlink', {
      fontawesome: 'fa-external-link'
    })

    // Components
    config.addComponent('example-article', ExampleArticleComponent)
    config.addComponent('title', TitleComponent)
    config.addComponent('body', BodyComponent)
    config.addComponent('paragraph', ParagraphComponent)
    config.addComponent('figure', FigureComponent)
    config.addComponent('emphasis', EmphasisComponent)
    config.addComponent('hyperlink', HyperlinkComponent)

    // Declarative spec for tool display
    config.addToolPanel('toolbar', [
      {
        name: 'text-types',
        type: 'tool-dropdown',
        showDisabled: false,
        style: 'descriptive',
        commandGroups: ['text-types']
      },
      {
        name: 'annotations',
        type: 'tool-group',
        showDisabled: true,
        style: 'minimal',
        commandGroups: ['annotations']
      }
    ])

    config.addToolPanel('main-overlay', [
      {
        name: 'prompt',
        type: 'tool-prompt',
        showDisabled: false,
        commandGroups: ['prompt']
      }
    ])

  },
  ExampleEditor
}
