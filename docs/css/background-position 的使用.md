最近看了一个爆炸图的 css 实现，原理是将图片背景融入到 m * n 列的 div 单元中，然后对他们进行随机的旋转，变换。

如果是早期做前端，接触过 sprite 图的，对这个案例应该很熟悉，就是利用同一张背景图的 background-position 属性，将图片融入到一个个小的单元中。

代码实现：

```js
			let m = 15;
			let n = 10;
			let w = 640;
			let h = 360;

			document.getElementById("m").onchange = function () {
				m = parseInt(this.value) > 0 ? parseInt(this.value) : 15;
				this.value = m;
			};
			document.getElementById("n").onchange = function () {
				n = parseInt(this.value) > 0 ? parseInt(this.value) : 15;
				this.value = n;
			};

			function once() {
				document.getElementById("jpg").innerHTML = "";

				const a = new Array(n)
					.fill(0)
					.map((v, i) => new Array(m).fill(0).map((v, j) => ({ i, j })))
					.flatMap((v) => v)
					.map((v) =>
						Object.assign(v, {
							div: document.createElement("div"),
							rotate: new Array(3)
								.fill(-180)
								.map((v) => v + Math.random() * 360 + "deg"),
							move: new Array(3)
								.fill(-200)
								.map((v) => v + Math.random() * 400 + "px"),
						})
					)
					.map(function (v) {
						v.div.style.width = 100 / m + "%";
						v.div.style.height = 100 / n + "%";
                        // 拆分块对应的比例和图片整个长度除以块数减一的比例相同
						v.div.style.backgroundPosition = `${(v.j * 100) / (m - 1)}% ${
							(v.i * 100) / (n - 1)
						}%`;
                        // 图片移动是按照坐标系来的，不要想当然的在图片上建立坐标系
                        v.div.style.backgroundPosition = `-${42.667 * v.j}px -${42.667 * v.i}px`
						setTimeout(() => {
							v.div.style.transform = `rotateX(${v.rotate[0]}) rotateY(${
								v.rotate[1]
							}) rotateZ(${v.rotate[2]}) translate3d(${v.move.join(",")}) `;
							v.div.style.opacity = 0;
						}, 1000);
                        console.log(v);
						return v;
					})
					.reduce((a, b) => {
						a.appendChild(b.div);
						return a;
                        // Creates a new empty DocumentFragment into which DOM nodes can be added to build an offscreen DOM tree.
					}, document.createDocumentFragment());
				document.getElementById("jpg").appendChild(a);

				setTimeout(() => {
					once();
				}, 5000);
			}
			once();
```

要注意的是，当 background-postion 的属性是百分比的时候，对应的规则是 X% 的图片位置，对应 X% 容器的位置。这个规则我是查找了 css-tricks 网站才发现的。MDN 只举了特例，0%，100%，50% 我还没明白过来。

将一条线段分成 m 端，对应有 m+1 个端点。如果这时将线段分为 m+1 块，那么前者的 m+1 个端口，正对应这个 m+1 条线段。端点占整条线段长度的比例，等于对应线段位置占线段长度的比例。可以证明。