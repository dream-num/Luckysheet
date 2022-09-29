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
		domain: 'https://dream-num.github.io/LuckysheetDemo',
		logo: '/img/logo.png',
		author: 'Luckysheet',
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
					{ text: 'Demo', link: 'https://dream-num.github.io/LuckysheetDemo/' },
					{
						text: 'More',
						ariaLabel: 'More',
						items: [
						  { text: 'About', link: '/about/' }
						]
					},
				],
				// 侧边栏 
				sidebar: {
					'/guide/': [
						'',
						'config',
						'sheet',
						'cell',
						'operate',
						'api',
						'resource',
						'FAQ',
						'contribute'
					],
					'/about/': [
						'',
						'sponsor',
						'company'
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
					{ text: '演示', link: 'https://dream-num.github.io/LuckysheetDemo/' },
					{
						text: '了解更多',
						ariaLabel: '了解更多',
						items: [
						  { text: '关于', link: '/zh/about/' }
						]
					},
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
						'resource',
						'FAQ',
						'contribute'
					],
					'/zh/about/': [
						'',
						'sponsor',
						'company'
					],
				},
			},
			
		},	
	},
	plugins: {
		'vuepress-plugin-baidu-autopush': {},
		'sitemap': {
			hostname: 'https://dream-num.github.io/LuckysheetDocs'
		},
		'vuepress-plugin-code-copy': true,
		'seo': {
			siteTitle: (_, $site) => $site.title,
			title: $page => $page.title,
			description: $page => $page.frontmatter.description,
			author: (_, $site) => $site.themeConfig.author,
			tags: $page => $page.frontmatter.tags,
			twitterCard: _ => 'summary_large_image',
			type: $page => ['guide'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
			url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
			image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
			publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
			modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
		}
	}
}