const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trailerSchema = new Schema({
	doubanId: {
		type: String,
		unique: true
	},
	video: String,
	cover: String,
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updatedAt: {
			type: Date,
			default: Date.now()
		}
	}
})

trailerSchema.pre('save', function (next) { // pre方法，在做什么之前
	if (this.isNew) {
		this.meta.createdAt = this.meta.updatedAt = Date.now()
	} else {
		this.meta.updatedAt = Date.now()
	}
	next()
})

mongoose.model('Trailer', trailerSchema)