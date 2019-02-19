const puppeteer = require('puppeteer')
const url = 'https://movie.douban.com/subject/'
// const trailerUrl = 'https://movie.douban.com/trailer/242838/'

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
	await page.goto(url + doubanId, {
		waitUntil: 'networkidle2'
	});
	await sleep(1000)
	
	const result = await page.evaluate(() => {
		// 防止打开的浏览器版本较老，使用老版本 js 书写
		var $ = window.$;
		var it = $('.related-pic-video')
		if (it && it.length > 0) {
			var link = it.attr('href')
			var cover = it[0].style.backgroundImage.slice(5, -3)
			return {
				link: link,
				cover: cover
			}
		}
		return {}
	})

	let video
	if (result.link) {
		await page.goto(result.link, {
			waitUntil: 'networkidle2'
		})
		await sleep(2000)
		video = await page.evaluate(() => {
			var $ = window.$
			var ite = $('source')
			if (ite && ite.length > 0) {
				return ite.attr('src')
			}
			return ''
		})
	}

	const data = {
		video: video,
		doubanId: doubanId,
		cover: result.cover
	}

	await browser.close()
	process.send(data)
	process.exit(0)
})()