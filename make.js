let b = require('substance-bundler')

b.task('clean', function() {
  b.rm('./dist')
})

b.task('assets', function() {
  b.copy('app/index.html', './dist/index.html')
  b.copy('./node_modules/font-awesome', './dist/font-awesome')
})

b.task('build', [ 'clean', 'assets' ], function() {
  b.js('./app/app.js', {
    target: {
      dest: './dist/app.js',
      format: 'umd',
      moduleName: 'ExampleEditor'
    }
  })

  b.css('./app/app.css', 'dist/app.css', { variables: true })
})

b.task('default', ['build'])

b.setServerPort(5555)

b.serve({ static: true, route: '/', folder: 'dist' })
