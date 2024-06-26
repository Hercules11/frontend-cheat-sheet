import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Hercules 的前端小抄",
	description: "记录一些前端代码片段",
	base: "/frontend-cheat-sheet/",
	head: [
		[
			"link",
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/frontend-cheat-sheet/vitepress-logo-mini.svg",
			},
		],
		[
			"link",
			{
				rel: "icon",
				type: "image/png",
				href: "/frontend-cheat-sheet/vitepress-logo-mini.png",
			},
		],
	],
	themeConfig: {
		logo: {
			src: "/vitepress-logo-mini.svg",
			width: 24,
			height: 24,
		},
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "主页", link: "/" },
			{
				text: "详情页",
				link: encodeURI("/javascript/class 的 function 和 prototype 实现.md"),
			},
		],

		sidebar: [
			{
				text: "React",
				collapsed: true,
				items: [
					{
						text: "useEffect 执行顺序",
						link: encodeURI("/react/useEffect 执行顺序.md"),
					},
					{
						text: "实现 useHover",
						link: encodeURI("/react/实现 useHover.md"),
					},
					{
						text: "为什么使用 useCallback",
						link: encodeURI("/react/为什么使用 useCallback.md"),
					},
				],
			},
			{
				text: "Vue",
				collapsed: true,
				items: [
					{
						text: "vue_shop 的 webpack 打包策略",
						link: encodeURI("/vue/vue_shop 的 webpack 打包策略.md"),
					},
					{
						text: "vue.config,js 配置项分析",
						link: encodeURI("/vue/vue.config,js 配置项分析.md"),
					},
				],
			},
			{
				text: "JavaScript",
				collapsed: true,
				items: [
					{
						text: "class 的 function 和 prototype 实现",
						link: encodeURI(
							"/javascript/class 的 function 和 prototype 实现.md"
						),
					},
					{
						text: "vscode 的 live reload 源代码分析",
						link: encodeURI("/javascript/vscode 的 live reload 源代码分析.md"),
					},
				],
			},
			{
				text: "TypeScript",
				collapsed: true,
				items: [
					{
						text: "实现 Filter<T, A>",
						link: encodeURI("/typescript/实现 Filter.md"),
					},
					{
						text: "实现 Slice<A, S, E>",
						link: encodeURI("/typescript/实现 Slice.md"),
					},
				],
			},
			{
				text: "CSS",
				collapsed: true,
				items: [
					{
						text: "css-in-depth 学习笔记",
						link: encodeURI("/css/css-in-depth 学习笔记.md"),
					},
					{
						text: "twitter css 布局",
						link: encodeURI("/css/twitter css 布局.md"),
					},
					{
						text: "background-position 的使用",
						link: encodeURI("/css/background-position 的使用.md"),
					},
				],
			},
			{
				text: "HTML",
				collapsed: true,
				items: [{ text: "HTML 语义化", link: encodeURI("/html/html 语义化") }],
			},
			{ text: "Markdown Examples", link: "/markdown-examples" },
			{ text: "Runtime API Examples", link: "/api-examples" },
		],

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/Hercules11/frontend-cheat-sheet",
				ariaLabel: "源代码仓库",
			},
		],
		darkModeSwitchLabel: "主题",
	},
});
