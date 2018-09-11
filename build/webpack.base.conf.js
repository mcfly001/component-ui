const path = require('path')
const env = process.env.NODE_ENV
const md = require('markdown-it')()
const slugify = require('transliteration').slugify
const striptags = require('./strip-tags')

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

function wrap(render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules|\.git|dist/,
        options: {
          presets: ['es2015', 'stage-2'],
          cacheDirectory: true
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true,
              use: [
                [require('markdown-it-anchor'), {
                  level: 2,
                  slugify: slugify,
                  permalink: true,
                  permalinkBefore: true
                }],
                [require('markdown-it-container'), 'demo', {
                  validate: function (params) {
                    return params.trim().match(/^demo\s*(.*)$/);
                  },

                  render: function (tokens, idx) {
                    var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                    if (tokens[idx].nesting === 1) {
                      var description = (m && m.length > 1) ? m[1] : '';
                      var content = tokens[idx + 1].content;
                      var html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
                      var script = striptags.fetch(content, 'script');
                      var style = striptags.fetch(content, 'style');
                      var jsfiddle = {html: html, script: script, style: style};
                      var descriptionHTML = description
                        ? md.render(description)
                        : '';

                      jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

                      return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
                            <div class="source" slot="source">${html}</div>
                            ${descriptionHTML}
                            <div class="highlight" slot="highlight">`;
                    }
                    return '</div></demo-block>\n';
                  }
                }],
                [require('markdown-it-container'), 'tip'],
                [require('markdown-it-container'), 'warning']
              ],
              preprocess: function (MarkdownIt, source) {
                MarkdownIt.renderer.rules.table_open = function () {
                  return '<table class="table">';
                };
                MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
                return source;
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'urlConfig': path.resolve(__dirname, '../config/' + env + '.js'),
      'src': path.resolve(__dirname, '../src')
    }
  },
  performance: {
    hints: false
  }
}
