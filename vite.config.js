const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  alias: {
    'ElementUI': 'element-ui',
    '/@/': resolve('src'),
    '/components/': resolve('src/components'),
    '/utils/': resolve('uilts')
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
  },
  //  三方ui
  // optimizeDeps: {
  //   include: ['ElementUI']
  // }
}
