const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Trailer = mongoose.model('Trailer')

;(async () => {
	const script = resolve(__dirname, '../crawler/video.js')
	const child = cp.fork(script, []) // 创建子进程
	let invoked = false
	child.on('error', err => {
		if (invoked) return
		invoked = true
		console.log(err)
	})
	child.on('exit', code => {
		if (invoked) return
		invoked = true
		let err = code === 0 ? null : new Error('exit code' + code)
		console.log(err)
	})
	child.on('message', async data => {
		let trailer = await Trailer.findOne({
			doubanId: data.doubanId
		})
		if (!trailer) {
			trailer = new Trailer(data)
			await trailer.save()
		}
	})
})()