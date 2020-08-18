module.exports = {
	base: '/LuckysheetDocs/',
	locales: {
		// 键名是该语言所属的子路径
		// 作为特例，默认语言可以使用 '/' 作为其路径。
		'/': {
			lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
			title: 'Luckysheet Document',
			description: 'Luckysheet is an online spreadsheet like excel that is powerful, simple to configure, and completely open source.This site contains official configuration document, API, and tutorial.'
		},
		'/zh/': {
			lang: 'zh-CN',
			title: 'Luckysheet文档',
			description: 'Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。本站包含官方配置文档,API,教程。'
		},
		
	},
	themeConfig: {
		logo: '/img/logo.png',
		
		// 仓库地址
		repo: 'mengshukeji/Luckysheet',
		// 允许编辑链接文字
		editLinks: true,
		// 仓库的文档目录 
		docsDir: 'docs',
		// 页面滚动
		smoothScroll: true,
		locales: {
			'/': {
				selectText: 'Languages',
				label: 'English',
				ariaLabel: 'Select language',
				editLinkText: 'Edit this page on GitHub',
				lastUpdated: 'Last Updated',
				serviceWorker: {
					updatePopup: {
						message: "New content is available.",
						buttonText: "Refresh"
					}
				},
				nav: [
					{ text: 'Home', link: '/' },
					{ text: 'Guide', link: '/guide/' },
					{ text: 'Demo', link: 'https://mengshukeji.github.io/LuckysheetDemo/' }
				],
				// 侧边栏 
				sidebar: {
					'/guide/': [
						'',
						'config',
						'data',
						'cell',
						'operate',
						'api',
						'FAQ'
					],
				},
			},
			'/zh/': {
				// 多语言下拉菜单的标题
				selectText: '选择语言',
				// 该语言在下拉菜单中的标签
				label: '简体中文',
				ariaLabel: '选择语言',
				// 编辑链接文字
				editLinkText: '在 GitHub 上编辑此页',
				lastUpdated: '上次更新',
				// Service Worker 的配置
				serviceWorker: {
					updatePopup: {
						message: "发现新内容可用.",
						buttonText: "刷新"
					}
				},
				// 导航栏
				nav: [
					{ text: '首页', link: '/zh/' },
					{ text: '指南', link: '/zh/guide/' },
					{ text: '演示', link: 'https://mengshukeji.github.io/LuckysheetDemo/' }
				],
				// 侧边栏 
				sidebar: {
					'/zh/guide/': [
						'',
						'config',
						'sheet',
						'cell',
						'operate',
						'api',
						'FAQ'
					],
				},
			},
			
		},	
	},
}