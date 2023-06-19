let cheerio = require('cheerio')
let fetch = require('node-fetch')

async function parseCaption(text) {
	let tRegex = /https:\/\/t.co\/[a-zA-Z0-9]+/g
	if (tRegex.test(text)) {
		for (let tUrl of text.match(tRegex)) {
			let rUrl = await (await fetch(tUrl)).url
			text = text.replace(tUrl, rUrl)
		}
		return text
	} else return text
}

async function getTwitterPost(username) {
	let html = await (await fetch(`https://www.sotwe.com/${username}`)).text()
	let $ = cheerio.load(html)
	let regex = /https:\/\/(?:video\.twimg\.com\/ext_tw_video\/(\d+)\/pu\/vid\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.mp4\?tag=(\d+)|pbs\.twimg\.com\/media\/[a-zA-Z0-9]+\.jpg)/g
	
	return $('.d-flex').get().map(el => ({
		time: $(el).find('time').attr('datetime'),
		ago: $(el).find('time').eq(0).text(),
		caption: parseCaption.bind(null, $(el).find('.px-4').text()),
		media: $(el).html().match(regex)
	})).filter(x => x.time)
}

async function post() {
let posst = await getTwitterPost('JKT48LiveX')
return posst
}
console.log(post[0].caption())
