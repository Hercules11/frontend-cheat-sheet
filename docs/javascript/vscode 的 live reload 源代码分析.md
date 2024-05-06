```js

// <![CDATA[  <-- For SVG support

// <![CDATA[ ... // ]]>：
// 这是一个 CDATA 区块，用于包含那些不应该被 XML 解析器处理的数据。在这个上下文中，它用于包含 JavaScript 代码，以防止 XML 解析器错误地解释其中的尖括号 < 和 >。
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, ''); // 把原来的时间戳替换掉，使得浏览器重新加载新的外部css 文件。
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload(); // 根据服务端的数据，客户端执行不同的动作,修改文件内容，默认用 reload.
				else if (msg.data == 'refreshcss') refreshCSS();
            };
            // 根据会话存储，打印第一次的启动日志
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
// ]]>
    // html live reload javascript.
```

整体上讲，vscode 的 `Open with Live Server` 功能，实现了网页内容包括引用的 css 文件修改后，自动重新加载页面的功能。

它的原理是通过将一段 js 代码注入到打开的网页文件中，js 代码运行会根据当前地址创建一个 `WebSocket`，然后接受服务端传过来的指令，进行页面重载或者重新加载 css 文件。