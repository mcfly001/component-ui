const path = require('path')
const env = process.env.NODE_ENV
const md = require('markdown-it')()
const slugify = require('transliteration').slugify
const striptags = require('./strip-tags')

/**
 * 由于cheerio在转换汉字时会出现转为Unicode的情况,所以我们编写convert方法来保证最终转码正确
 * @param  {[String]} str e.g  &#x6210;&#x529F;
 * @return {[String]}     e.g  成功
 */
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

/**
 * 由于v-pre会导致在加载时直接按内容生成页面.但是我们想要的是直接展示组件效果,通过正则进行替换
 * hljs是highlight.js中的高亮样式类名
 * @param  {[type]} render e.g '<code v-pre class="test"></code>' | '<code></code>'
 * @return {[type]}        e.g '<code class="hljs test></code>'   | '<code class="hljs></code>'
 */
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
