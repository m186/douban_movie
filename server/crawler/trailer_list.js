const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/tag/#/?sort=U&range=6,10&tags='

const sleep	= time => {
	return new Promise(resolve => {
		setTimeout(resolve, time)
	})
}

;(async () => {
	console.log('开始')
	const browser = await puppeteer.launch({
		dumpio: false,
		args: ['--no-sanbox']
	});
  	const page = await browser.newPage()
	await page.goto(url, {
		waitUntil: 'networkidle2'
	});
	await sleep(3000)
	// 等待页面元素展示出来
	await page.waitForSelector('.more')

	for (let i = 0; i < 1; i++) {
		await sleep(3000)
		await page.click('.more')
	}
	const result = await page.evaluate(() => {
		// 防止打开的浏览器版本较老，使用老版本 js 书写
		var $ = window.$;
		var items = $('.list-wp>a')
		var links = []
		if (items.length >=1) {
			items.each(function (index, item) {
				console.log(index)
				console.log(item)
				var it = $(item);
				var doubanId = it.find('div').data('id');
				var title = it.find('.title').text();
				var rate = Number(it.find('.rate').text());
				var poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio');

				links.push({
					doubanId: doubanId,
					title: title,
					rate: rate,
					poster: poster
				})
			})
		}
		return links;
	})

	await browser.close()
	process.send({result})
	process.exit(0)
})()