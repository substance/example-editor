import { DocumentNode } from 'substance'

export default class ExampleArticle extends DocumentNode {}

ExampleArticle.schema = {
  type: 'example-article',
  title: { type: 'id' },
  body: { type: 'id' }
}
