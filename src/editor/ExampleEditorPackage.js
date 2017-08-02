import {
  AnnotationCommand,
  BasePackage as SubstanceBasePackage,
  Document as SubstanceDocument,
  SwitchTextTypeCommand,
  XMLImporter
} from 'substance'

import {
  Body,
  ExampleArticle,
  Paragraph,
  Title,
  Emphasis
} from '../nodes'

import {
  BodyConverter,
  ExampleArticleConverter,
  ParagraphConverter,
  TitleConverter,
  EmphasisConverter
} from '../converters'

import ExampleArticleComponent from './components/ExampleArticleComponent'
import BodyComponent from './components/BodyComponent'
import TitleComponent from './components/TitleComponent'
import ParagraphComponent from './components/ParagraphComponent'
import EmphasisComponent from './components/EmphasisComponent'

import ExampleEditor from './components/ExampleEditor'

export default {
  name: 'author',
  configure(config) {
    config.defineSchema({
      name: 'example-article',
      ArticleClass: SubstanceDocument,
      defaultTextType: 'paragraph'
    })

    config.import(SubstanceBasePackage)

    // Register Nodes
    config.addNode(ExampleArticle)
    config.addNode(Title)
    config.addNode(Body)
    config.addNode(Paragraph)
    config.addNode(Emphasis)

    // Converters
    config.addConverter('xml', ExampleArticleConverter)
    config.addConverter('xml', TitleConverter)
    config.addConverter('xml', BodyConverter)
    config.addConverter('xml', ParagraphConverter)
    config.addConverter('xml', EmphasisConverter)

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

    // Icons
    config.addIcon('emphasis', { 
      fontawesome: 'fa-italic' 
    })

    // Components
    config.addComponent('example-article', ExampleArticleComponent)
    config.addComponent('title', TitleComponent)
    config.addComponent('body', BodyComponent)
    config.addComponent('paragraph', ParagraphComponent)
    config.addComponent('emphasis', EmphasisComponent)

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
      // {
      //   name: 'prompt',
      //   type: 'tool-prompt',
      //   showDisabled: false,
      //   commandGroups: ['prompt']
      // }
    ])

  },
  ExampleEditor
}
