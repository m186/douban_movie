// 七牛云数据存储示例

const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
const uploadToQiniu = async (url, key) => {
	return new Promise((resolve, reject) => {
		client.fetch(url, bucket, key, (err, ret, info) => {
			if (err) {
				reject(err)
			} else {
				if (info.statusCode === 200) {
					resolve({key})
				} else {
					reject(info)
				}
			}
		})
	})
}

;(async () => {
	const movies = [
		{ 
			video: 'http://vt1.doubanio.com/201902151619/c5202fc045302ff11c1321fe679947b4/view/movie/M/301630081.mp4',
			doubanId: '1652587',
			poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2180085848.jpg',
			cover: 'https://img1.doubanio.com/img/trailer/medium/2200531679.jpg'
		}
	]

	movies.map(async movie => {
		if (movie.video && !movie.key) {
			try {
				let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
				let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
				let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')

				if (videoData.key) {
					movie.videoKey = videoData.key
				}
				if (coverData.key) {
					movie.coverKey = coverData.key
				}
				if (posterData.key) {
					movie.posterKey = posterData.key
				}
				console.log(movie)
			} catch (error) {
				console.log(error)
			}
		}
	})
})()