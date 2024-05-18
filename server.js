var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  
  if (path === '/') {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8")
    response.write(`
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>/</title>
        </head>
        <body>
          <h1 id="h1Txt">Jame Time</h1>
          <button id="addCss">加载CSS,文字变红</button>
          <button id="addJs">加载JS,出现弹框</button>

          <script src="/js"></script>
        </body>
      </html>
    `);
    response.end();
  } else if (path === '/js') {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    response.write(`
      let addCss = document.querySelector("#addCss");
      let addJs = document.querySelector("#addJs");
      let h1Txt = document.querySelector("#h1Txt");

      function func1() {
        h1Txt.style.color = "gold";
      }

      function func2() {
        alert("这是一个弹窗");
      }

      addCss.addEventListener("click", func1);

      addJs.addEventListener("click", func2);
    `);
    response.end();
  } else if (path === '/css') {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(`
      h1 {
        color: red;
      }
      h5 {
        color: green;
      }
    `);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`
      <!DOCTYPE html>
      <html lang="zh">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/css" />
          <title>404</title>
        </head>
        <body>
          <h1>404: Page Not Found</h1>
          <h5>可以添加我的微信 nuolu-bot 反馈此链接。</h5>
        </body>
      </html>
    `);
    response.end();
  }

  // if(path === '/'){
  //   response.statusCode = 200
  //   response.setHeader('Content-Type', 'text/html;charset=utf-8')
  //   response.write(`二哈`)
  //   response.end()
  // } else if(path === '/x'){
  //   response.statusCode = 200
  //   response.setHeader('Content-Type', 'text/css;charset=utf-8')
  //   response.write(`body{color: red;}`)
  //   response.end()
  // } else {
  //   response.statusCode = 404
  //   response.setHeader('Content-Type', 'text/html;charset=utf-8')
  //   response.write(`你输入的路径不存在对应的内容`)
  //   response.end()
  // }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

