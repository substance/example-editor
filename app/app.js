import { Configurator, EditorSession } from 'substance'

import { ExampleEditor, ExampleEditorPackage } from '../index.es.js'
import fixture from './fixture'

let config = new Configurator()
config.import(ExampleEditorPackage)

window.onload = function() {
  // Import article from XML markup
  let importer = config.createImporter('xml')
  let doc = importer.importDocument(fixture)
  // This is the data structure manipulated by the editor
  let editorSession = new EditorSession(doc, {
    configurator: config
  })

  // Mount the editor to the DOM and run it
  ExampleEditor.mount({
    editorSession: editorSession
  }, document.body)
}
