import { DocumentNode } from 'substance'

class Figure extends DocumentNode {

  getImageSource() {
    if (this.imageSource) {
      return this.imageSource
    }
  }
}

Figure.schema = {
  type: 'figure',
  imageSource: { type: 'string' },
  title: { type: 'string' },
  caption: { type: 'string' }
}

export default Figure