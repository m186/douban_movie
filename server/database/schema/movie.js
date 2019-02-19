const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Mixed, ObjectId } = Schema.Types

const movieSchema = new Schema({
	doubanId: {
		type: String,
		unique: true
	},
	category: [{
		type: ObjectId,
		ref: 'Category'
	}],
	rate: Number,
	title: String,
	summary: String,
	video: String,
	poster: String,
	cover: String,
	rawTitle: String,
	movieTypes: [String],
	pubdate: Mixed,
	year: Number,
	tags: [String],
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			default: Date.now()
		}
	},
	videoKey: String,
	posterKey: String,
	coverKey: String
})

movieSchema.pre('save', function (next) { // pre方法，在做什么之前
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now()
	} else {
		this.meta.updatedAt = Date.now()
	}
	next()
})

mongoose.model('Movie', movieSchema)