const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchema } = require('./database/init')

;(async () => {
	await connect()
	initSchema()

	/**
	 * 爬取豆瓣电影的数据
	 * 依次打开执行以下代码后关闭
	 */
	// require('./tasks/movies')
	// require('./tasks/api')
})()

const response = require('./middlewares/response')
app.use(response)

const router = require('./routes/index')
app.use(router.routes()) // 分发路由

app.listen(3000, () => {
	console.log('server start at the port http://localhost:3000')
})