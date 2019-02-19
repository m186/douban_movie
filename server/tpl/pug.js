module.exports = `
doctype html
html
	head
		meta(charset="UTF-8")
		meta(name="viewport" content="width=device-width, initial-scale=1.0")
		meta(http-equiv="X-UA-Compatible" content="ie=edge")
		title koa pug
		link(rel="stylesheet" href="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/css/bootstrap.min.css")
		script(src="https://cdn.bootcss.com/jquery/3.2.0/jquery.min.js")
		script(src="https://cdn.bootcss.com/twitter-bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js")
	body
		.container
			.row
				.col-md-8
					h1 Hi #{you}
					p This #{me}
				.col-md-4
					h1 #{me}
					p 测试静态页面
`