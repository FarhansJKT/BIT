const cron = require('node-cron');
let conna = "ya"
async function getstart(conn) {
	cron.schedule('*/15 * * * * *', async function () {
		console.log(conn)
	})
}

async function getst(conn) {
	cron.schedule('*/1 * * * * *', async function () {
		console.log(conn)
	})
}

getstart(conna)
getst(conna+1)

