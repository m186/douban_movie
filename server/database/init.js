const mongoose = require('mongoose')
const glob = require('glob')
const { resolve } = require('path')
const db = 'mongodb://localhost:27017/nodeBlog'
mongoose.Promise = global.Promise // 将 mongoose 内的 Promise 设置为 node 的 Promise

exports.initSchema = () => { // 通过 glob 来加载 schema 内的所有文件
	glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
	let maxTimes = 0
	return new Promise((resolve, reject) => {
		if (process.env.NODE_ENV === 'production') {
			mongoose.set('debug', true)
		}
		mongoose.connect(db) // 连接数据库
		mongoose.connection.on('disconnected', () => { // 如果断开连接，则再次连接
			maxTimes++
			if (maxTimes <= 5) {
				mongoose.connect(db)
			} else {
				throw new Error('数据库挂了吧，骚年...')
			}
		})
		mongoose.connection.on('error', err => { // 如果连接出错，则报告错误
			maxTimes++
			if (maxTimes <= 5) {
				mongoose.connect(db)
			} else {
				reject(err)
				throw new Error('数据库挂了吧，骚年...')
			}
			console.log(err)
		})
		mongoose.connection.once('open', () => {
			resolve()
			console.log('数据库连接成功')
		})
	})
}