const Router = require('koa-router')
const mongoose = require('mongoose')

const router = new Router({
	prefix: '/movies'
})

router.get('/', async (ctx, next) => {
	const Movie = mongoose.model('Movie')
	const movies = await Movie.find({}).sort({
		'meta.createdAt': -1
	})
	console.log(movies)
	if (!movies) {
		ctx.state = {
			code: 1,
			data: {
				msg: 'not found',
				movies
			}
		}
	} else {
		ctx.state = {
			code: 0,
			data: {
				msg: 'sucess',
				movies
			}
		}
	}
})

router.get('/:id', async (ctx, next) => {
	const Movie = mongoose.model('Movie')
	const id = ctx.params.id
	const movie = await Movie.findOne({
		doubanId: id
	})
	if (!movie) {
		ctx.state = {
			code: 1,
			msg: 'not found',
			data: {
				movie
			}
		}
	} else {
		ctx.state = {
			code: 0,
			msg: 'sucess',
			data: {
				movie
			}
		}
	}
})

router.get('/trailer/:id', async (ctx, next) => {
	const Trailer = mongoose.model('Trailer')
	const id = ctx.params.id
	const trailer = await Trailer.findOne({
		doubanId: id
	})
	if (!trailer) {
		ctx.state = {
			code: 1,
			msg: 'not found',
			data: {
				trailer
			}
		}
	} else {
		ctx.state = {
			code: 0,
			msg: 'sucess',
			data: {
				trailer
			}
		}
	}
})

module.exports = router