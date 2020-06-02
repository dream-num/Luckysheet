module.exports = {
	title: 'Luckysheet文档',
	description: 'Luckysheet 配置文档/API/教程',
	base: '/LuckysheetDocs/',
	themeConfig: {
		logo: '/img/logo.png',
		// 页面滚动
		smoothScroll: true,
		// 导航栏
		nav: [
			{ text: '首页', link: '/' },
			{ text: '指南', link: '/guide/' },
			{ text: '演示', link: 'https://mengshukeji.github.io/LuckysheetDemo/' },
			{ text: 'Github', link: 'https://github.com/mengshukeji/Luckysheet' },
		],
		// 侧边栏 
		sidebar: {
			'/guide/': [
			  '',
			  'config',
			  'feature',
			  'data',
			  'operate'
			],
		  },
		// 仓库地址
		repo: 'mengshukeji/Luckysheet',
		// 仓库链接文字
		repoLabel: '在 GitHub 上编辑此页',
		// 仓库的文档目录 
		docsDir: 'docs',
	},
}