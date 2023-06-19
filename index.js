"use strict";
const {
	default: makeWASocket,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useSingleFileAuthState,
	delay
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
const fs = require("fs");
const moment = require('moment')
const momenta = require('moment-timezone')
const chalk = require('chalk')
const fetch = require('node-fetch');
const { load } = require('cheerio');
const logg = require('pino')
const clui = require('clui')
const { Spinner } = clui
const tag_titit = `*JKT48 LIVE X* ( Whatsapp Bot )
JKT48 の非フェラーボット [ KEBAB48 ]`
const { serialize, getBuffer, fetchJson, sleep } = require("./lib/myfunc");
const { color, mylog, infolog } = require("./lib/color");
const cron = require('node-cron');
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
let setting = JSON.parse(fs.readFileSync('./config.json'));
let session = `./session.json`
const { state, saveState } = useSingleFileAuthState(session)
//const { TwitterApi } = require('twitter-api-sdk');
const { TwitterApi } = require('twitter-api-v2');
let welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));

// judul console
function title() {
      console.clear()
	  console.log(chalk.bold.green(figlet.textSync('JKT48', {
		font: 'Standard',
		horizontalLayout: 'default',
		verticalLayout: 'default',
		width: 100,
		whitespaceBreak: false
	})))
}

// cek module perubahan
function nocache(module, cb = () => { }) {
	console.log(`Module ${module} sedang diperhatikan terhadap perubahan`) 
	fs.watchFile(require.resolve(module), async () => {
		await uncache(require.resolve(module))
		cb(module)
	})
}
// module uncache
function uncache(module = '.') {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(module)]
			resolve()
		} catch (e) {
			reject(e)
		}
	})
}

const status = new Spinner(chalk.cyan(` Booting WhatsApp Bot`))
const starting = new Spinner(chalk.cyan(` Preparing After Connect`))
const reconnect = new Spinner(chalk.redBright(` Reconnecting WhatsApp Bot`))
const idt = '6281393668101@s.whatsapp.net'
async function nontifer_i(conn, cap, imageurl) {
//let media = await getBuffer(imageurl);
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
conn.sendMessage(idt, { image: { url: imageurl }, caption: cap })
//send
}

async function getshorttw(linke) {
const response = await fetch(linke);
const budy = await response.text();
let $ = load(budy);
let lise = $('title').text();
return lise
}

async function initializeLink(text) {
  const tt = text
  const urlPattern = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  try {
   const urls = text.match(urlPattern) || [];
   for (let i of urls) {
     if (i.startsWith("https://t.co/")) {
       tt = tt.replace(i, getshorttw(i));
	console.log(tt);
     }
   }
   return tt
  } catch { return tt }
}

// Example usage;

async function nontifer(conn, cup) {
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
let cap = await initializeLink(cup)
cap +=`\n${tag_titit}`
for (let i of anu) {
await conn.sendMessage(i, { text: cap })
console.log(`terkirim ke ${i}`);
await sleep(1000);
}
console.log("NGIRIM KE PARHAN");
conn.sendMessage(idt, { text: cap })
}

const username = 'JKT48LiveX';

const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })

/*const client = new TwitterApi({
  appKey: "vkGAXmMSrnbk39y6JVTOY5jbv",
  appSecret: 'DhTHmQ7J9CoCEdaWNlcppm6LUusQSkBbZYdPMrbtzv755Tl4sP',
  accessToken: '1622627422842806273-hLQvt20hQu7zHQu2foIabkUjsurkUc',
  accessSecret: '3lNaZrTJDZZzp52KwQUG1XEeRO0DswmCUQ7tA13I4F2Uw',
});*/

const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAMhQnwEAAAAAqdGmIVhUXqH43g2zTg%2B5V7ajaK8%3DzmUuO0mylyB2xyVgsjl2JFnm1EnYM8IMCICjZV0KB3qiki4xud');
//const client = new TwitterApi({ clientId: 'YUk0Z3drYjZYdFRZWDUtY2VRYUI6MTpjaQ', clientSecret: '0igc76JecDjz28l9CDvGm0v4CpsUQafaFjN0knaU7a6vSmkZpK' });
//const tag_titit = `*JKT48 LIVE X* ( Whatsapp Bot )
//JKT48 の非フェラーボット [ KEBAB48 ]`

async function streamNewTweetsAndSendToWhatsApp(conn) {
  try {
/*    const { StreamFilteredStream } = require('twitter-api-v2');

    const stream = new StreamFilteredStream(client);
    stream.withKeyword('@JKT48LiveX');*/

    await client.v2.streamRules();
    // Delete existing rules
    if (rules.data && rules.data.length > 0) {
      const deletePromises = rules.data.map((rule) => client.v2.deleteRule(rule.id));
      await Promise.all(deletePromises);
    }3

    // Add new rule for the desired search query
    const searchQuery = '@JKT48LiveX';
    const addedRules = await client.v2.updateStreamRules({
      add: [
    { value: 'JKT48LiveX'}
       ],
    });

    // Start streaming new tweets
    const stream = await client.v2.stream('tweets/search/stream');
//    const stream = await client.v2.sampleStream();

    stream.start((tweet) => {

      stream.on('data', async (tweet) => {
      let mediaUrl = null;
      console.log(tweet);
      let texts = `${tweet.text}`
      texts += `\n\n${tag_titit}`
      console.log(texts)
       if (tweet.includes && tweet.includes.media && tweet.includes.media.length > 0) {
           const mediaKey = tweet.includes.media[0].media_key;
           const media = await client.v2.media(mediaKey);
           mediaUrl = media.data.url;
           nontifer_i(conn, texts, mediaUrl);
        } else { nontifer(conn, texts) }
      });
    });
  } catch(error) {
    console.error('Error:', error);
  }
}
var tu = 0
var recent = []
var recenta = []
// JKT48 NONTIFER
//var fs = require('fs')
//var markup = fs.readFileSync('tes.html', 'utf8').toString();

let cheerio = require('cheerio')
//let fetch = require('node-fetch')

async function parseCaption(text) {
	let tRegex = /https:\/\/t.co\/[a-zA-Z0-9]+/g
	if (tRegex.test(text)) {
		for (let tUrl of text.match(tRegex)) {
			await sleep(500);
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
	await sleep(1000);
	return $('.d-flex').get().map(el => ({
		time: $(el).find('time').attr('datetime'),
		ago: $(el).find('time').eq(0).text(),
		caption: parseCaption.bind(null, $(el).find('.px-4').text()),
		media: $(el).html().match(regex),
		pin: $(el).find('.pinned-text').text()
	})).filter(x => x.time)
}


/*async function BCMEDIA(conn, media, tutas, nah) {
await sleep(1000);
console.log(`UPDATE MEDIA : ${media}\n-------------------------------->`)
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
for (let i of anu) {
  let { participants } = await conn.groupMetadata(i)
  if (nah == true) {
     await conn.sendMessage(i, { image : { url : media }, caption: tutas, mentions: participants.map(x => x.id)})
  } else {
     await conn.sendMessage(i, { image : { url : media }, mentions: participants.map(x => x.id)})
  }
  await sleep(2000);
}
}

async function BCTEXT(conn, cap) {
console.log(`UPDATE TEXT : \n${cap}\n-------------------------------->`)
await sleep(3000);
let getGroups = await conn.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
await sleep(1000);
for (let i of anu) {
  let { participants } = await conn.groupMetadata(i)
  await conn.sendMessage(i, { text: cap , mentions: participants.map(x => x.id)})
  await sleep(1000);
}
}

async function jamSiki() {
let titaiat = momenta().tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm")
return `${titaiat}`
}

async function jamkene(jam) {
let titiat = momenta(jam).tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm")
return `${titiat}`
}


///////////////


const mode_gas = true


//////////////

// Initialize the recent array
let recent = [];
let recent_jkt = [];
let barusan = [];
// Function to process a new JSON object
async function cekRecent(conn, json) {
  // Check if the JSON object is already in the recent array
  var sammaga = momenta(json.time).tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm") == momenta.tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm")
  console.log(json)
  if (sammaga || recent[recent.length - 1].time !== json.time) {
    recent.push(json);
    console.log(recent[recent.length - 1]);
    console.log("Processing new JSON:", json);
    if (json.media == null) {
        BCTEXT(conn, json.caption)
    } else if (json.media.length > 1) {
        let tiket_cent = json.media.length - 1
        for (let med of json.media){
             if (tiket_cent == 0) {
                  BCMEDIA(conn, med, json.caption, true);
             } else {
                  BCMEDIA(conn, med, "", false);
             }
             tiket_cent -= 1
             await sleep(500);
        }
    } else {
       BCMEDIA(conn, med, json.caption, true);
    }
  } else {
      console.log("Json Al Ready Recent");
  }
}

async function cekRecentOfc(conn, json, agonya) {
  // Check if the JSON object is already in the recent array
  var samaga = momenta(json.time).tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm") == momenta.tz("Asia/jakarta").format("YYYY-MM-DD-HH-mm")
  console.log(json)
  if (samaga || recent_jkt[recent_jkt.length - 1].time !== json.time) {
    recent_jkt.push(json);
    console.log(recent_jkt[recent_jkt.length - 1]);
    console.log("Processing new JSON: OFC", json);
    let footernya = `🗓️ ${json.time}\n🕒 ${agonya}\n👤 Official JKT48 [ LIVE TWEET ]\n\n${tag_titit}`
    let contol = `${json.caption}\n\n${footernya}`
    console.log(contol)
    if (json.media == null) {
        BCTEXT(conn, contol)
    } else if (json.media.length > 1) {
        let tiket_centa = json.media.length - 1
        for (let med of json.media){
             if (tiket_centa == 0) {
                  BCMEDIA(conn, med, contol, true);
             } else {
                  BCMEDIA(conn, med, "", false);
             }
             tiket_centa -= 1
             await sleep(500);
        }
    } else {
       BCMEDIA(conn, med, contol, true);
    }
  } else {7
      console.log("Json Al Ready Recent OFC");
  }
}

async function startPush() {
console.log("[START PUSH]");
let indeka = 0
let post = await getTwitterPost('JKT48LiveX');
let pinnya = post[indeka].pin
if (pinnya.includes("Pinned Tweet")) {
  indeka += 1
  console.log("LIVE PIN SKIP")
}
let acap = await post[indeka].caption()
recent.push({time: post[indeka].time, caption: acap, media: post[indeka].media});
await sleep(1000);
let indekas = 0
let pist = await getTwitterPost('officialJKT48');
let pinya = post[indekas].pin
if (pinya.includes("Pinned Tweet")) {
  indekas += 1
  console.log("OFC PIN SKIP")
}
let acip = await pist[indekas].caption()
let kae = await pist[0].caption()
recent_jkt.push({time: pist[0].time, caption: kae, media: pist[0].media});
recent_jkt.push({time: pist[indekas].time, caption: acip, media: pist[indekas].media});
}


let seba = 0
async function JKT48API(conn) {
console.log("JKT48 FETCHING");
if ( seba == 0 ) {
await startPush();
seba += 1
console.log(recent[0])
console.log(recent_jkt[0])
} else {
seba += 1
let siki = []
let posta = await getTwitterPost('JKT48LiveX');
  let inka = 0
  let pint = posta[inka].pin
  if (pint.includes("Pinned Tweet")) {
     inka += 1
     console.log("LIVE PIN SKIP");
  }
  let feeds = posta[inka]
  let times = feeds.time
  let gon = feeds.ago
  let capi = await feeds.caption()
  let mediaa = feeds.media
  let jose = {time: times, caption: capi, media:mediaa}
await cekRecent(conn, jose);
}
}

async function JKT48OFC(conn) {
//if (mode_gas == false) return console.log("[SKIPPED] MODE GAS OFF");
let posti = await getTwitterPost('officialJKT48');
let pua = 0
let piwa = posti[pua].pin
if (piwa.includes("Pinned Tweet")) {
   pua += 1
   console.log("OFC PIN SKIP");
}
let feedss = posti[pua]
let timess = feedss.time
let gons = feedss.ago
let capis = await feedss.caption()
let mediaas = feedss.media
let joser = {time: timess, caption: capis, media:mediaas}
await cekRecentOfc(conn, joser, feedss.ago);
}
*/
const mode_gas = true
const connectToWhatsApp = async () => {

	const conn = makeWASocket({
            printQRInTerminal: true,
            logger: logg({ level: 'fatal' }),
            auth: state,
            version: [2, 2323, 4],
            browser: ["WhatsRice Multi Device", "MacOS", "3.0"]
        })
	title()
        store.bind(conn.ev)
	await sleep(2000);
	require('./sr2')(conn);
//	streamNewTweetsAndSendToWhatsApp(conn)
//        cron.schedule('*/20 * * * * *', async function () {
//		  await sleep(1000);
//        })
/*	twitterApi.stream('statuses/filter', { track: '@JKT48LiveX' }, (stream) => {
	  stream.on('data', (tweet) => {
	    console.log('New tweet received:', tweet);
            //ini disini
		texts = `${tweet.text}`
		const urls = tweet.entities.urls;
		if (urls.length > 0) {
			const url_tw = urls[0].expanded_url;
			texts += `🔗 Link : ${url_tw}\n`
		}
		texts += `\n${tag_titit}`
		if (tweet.entities.media) {
			const mediaUrls = tweet.entities.media.map((media) => media.media_url_https);
			let pp_sr = mediaUrls
			nontifer_i(conn, texts, pp_sr)
		} else { nontifer(conn, texts) }
	  });

	  stream.on('error', (error) => {
	    console.error('Twitter stream error:', error);
	  });
	});*/



	/* Auto Update */
	require('./message/help')
	require('./lib/myfunc')
	require('./message/msg')
        nocache('./index', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/help', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./lib/myfunc', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	nocache('./message/msg', module => console.log(chalk.greenBright('[ WHATSAPP BOT ]  ') + time + chalk.cyanBright(` "${module}" Telah diupdate!`)))
	conn.multi = true
	// conn.nopref = false
	// conn.prefa = 'anjing'
	conn.ev.on('messages.upsert', async m => {
		if (!m.messages) return;
		var msg = m.messages[0]
		msg = serialize(conn, msg)
		msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
		require('./message/msg')(conn, msg, m, setting, store, welcome, recent)
	})

	//jika close atau logout
	conn.ev.on('connection.update', (update) => {
		const { connection, lastDisconnect } = update
		if (connection === 'close') {
			status.stop()
			reconnect.stop()
			starting.stop()
			console.log(mylog('Server Ready ✓'))
			lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut 
			? connectToWhatsApp()
			: console.log(mylog('Wa web terlogout...'))
		}
	})
	conn.ev.on('creds.update', () => saveState)
        conn.ev.on('group-participants.update', async (data) => {
           const isWelcome = true
           if (isWelcome) {
             try {
               for (let i of data.participants) {
                 if (data.action == "add") {
		   if (mode_gas == false) {
			console.log("[SKIPPED PARTICIPANT] MODE GAS OFF");
		   } else {
//	                   conn.sendMessage(data.id, { text: `Selamat Bergabung @${i.split("@")[0]} di komunitas 🎉`, mentions: [i] })
		   }
                 } else if (data.action == "remove") {
                   console.log("member metu");
                 }
               }
             } catch (e) {
               console.log(e)
             }
           }
        })

	conn.reply = (from, content, msg) => conn.sendMessage(from, { text: content }, { quoted: msg })

	return conn
}

connectToWhatsApp()
.catch(console.log("y"))



require('./message/cron')(connectToWhatsApp)
