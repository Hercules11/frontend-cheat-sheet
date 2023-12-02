import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "前端小抄",
	description: "记录一些前端代码片段",
	base: "/frontend-cheat-sheet/",
	head: [
		[
			"link",
			{ rel: "icon", type: "image/svg+xml", href: "/vitepress-logo-mini.svg" },
		],
		[
			"link",
			{ rel: "icon", type: "image/png", href: "/vitepress-logo-mini.png" },
		],
	],
	themeConfig: {
		logo: { src: "/vitepress-logo-mini.svg", width: 24, height: 24 },
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "主页", link: "/" },
			{
				text: "详情页",
				link: "/javascript/Class 的 Function 和 Prototype 实现.md",
			},
		],

		sidebar: [
			{
				text: "JavaScript 相关",
				collapsed: true,
				items: [
					{
						text: "Class 的 Function 和 Prototype 实现",
						link: "/javascript/Class 的 Function 和 Prototype 实现.md",
					},
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
			{
				text: "CSS 相关",
				collapsed: true,
				items: [
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
			{
				text: "HTML 相关",
				collapsed: true,
				items: [
				{ text: "Test CD", link: "/html/Test CD"},
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
		],

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/Hercules11/frontend-cheat-sheet",
			},
		],
	},
});
