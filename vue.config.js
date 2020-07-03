const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  alias: {
    '@': '/src',
    'components': '/src/components'
  },
  proxy: {
    // string shorthand
    '/foo': 'http://localhost:4567/foo',
    // with options
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
