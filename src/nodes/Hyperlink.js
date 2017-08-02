import { PropertyAnnotation, Fragmenter } from 'substance'

class Hyperlink extends PropertyAnnotation {}

Hyperlink.schema = {
  type: "hyperlink",
  title: { type: 'string', optional: true },
  url: { type: 'string', 'default': ''}
}

// in presence of overlapping annotations will try to render this as one element
Hyperlink.fragmentation = Fragmenter.SHOULD_NOT_SPLIT

Hyperlink.autoExpandRight = false

export default Hyperlink