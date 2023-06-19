/**
  * Created by Irfan
  * Contact me on WhatsApp wa.me/6285791458996
  * Follow me on Instagram @yannnnn.zz_
  * If you want to buy an updated script that is not encrypted, please WhatsApp me
*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const { pinterest } = require("../lib/pinterest")
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require("../lib/limit");
const { isTicTacToe, getPosTic } = require("../lib/tictactoe");
const { addPlayGame, getJawabanGame, isPlayGame, cekWaktuGame, getGamePosi } = require("../lib/game");
const tictac = require("../lib/tictac");
const _prem = require("../lib/premium");
const fetch = require('node-fetch');
let cheerio = require('cheerio')
const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
//const xfar = require('xfarr-api');
const axios = require("axios");
//const hxz = require("hxz-api");
//const ra = require("ra-api");
//const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()
const wmj = `*JKT48 LIVE X* ( Whatsapp Bot )
JKT48 の非フェラーボット [ KEBAB48 ]`
// DB Game
let tictactoe = [];
let tebakgambar = []
let limitot = 100000
// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
let mess = JSON.parse(fs.readFileSync('./message/response.json'));
let premium = JSON.parse(fs.readFileSync('./database/premium.json'));
let balance = JSON.parse(fs.readFileSync('./database/balance.json'));
let limit = JSON.parse(fs.readFileSync('./database/limit.json'));
let glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

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
	console.log(html);
	let regex = /https:\/\/(?:video\.twimg\.com\/ext_tw_video\/(\d+)\/pu\/vid\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.mp4\?tag=(\d+)|pbs\.twimg\.com\/media\/[a-zA-Z0-9]+\.jpg)/g
	return $('.d-flex').get().map(el => ({
		time: $(el).find('time').attr('datetime'),
		ago: $(el).find('time').eq(0).text(),
		caption: parseCaption.bind(null, $(el).find('.px-4').text()),
		media: $(el).html().match(regex)
	})).filter(x => x.time)
}

async function getOshi() {
var link = "https://jkt48.com/member/list?lang=id"
let html = await (await fetch(link)).text()
let $ = cheerio.load(html)
console.log(html)
let tut = []
$('div[class="row row-all-10"]').find('.entry-member').each(function (ins, iu) {
let gay = {
name : $(iu).find('p').text(),
image : `https://jkt48.com`+$(iu).find('img').attr('src'),
detail : `https://jkt48.com`+$(iu).find('a').attr('href')
}
tut.push(gay);
});
return tut
}

async function statsjeke() {
var link = "https://www.rebornian48.com/member/"
let html = await (await fetch(link)).text()
let $ = cheerio.load(html)
let stats = {
main_stats: [],
age_stats: [],

}
$('div[class="col-md-3"]').find('.info-box').each(function (ins, iu) {
let gay = {
title : $(iu).find('.info-box-text').text(),
count : $(iu).find('.info-box-number').text(),
}
stats.main_stats.push(gay);
});
let guy = []
let ttnya = []
let strong = 0
$('div[class="card"]').find('.card-body').each(function (ins, iu) {
$(iu).find('p').each(function (insa, ik) {
ttnya.push($(ik).text())
});
});
let content_1 = { title : ttnya[0], content: ttnya[1] }
let content_2 = { title : ttnya[2], content: ttnya[3] }
let content_3 = { title : ttnya[4], content: ttnya[5] }
let content_4 = { title : ttnya[6], content: ttnya[7] }

stats.age_stats.push(content_1);
stats.age_stats.push(content_2);
stats.age_stats.push(content_3);
stats.age_stats.push(content_4);


return stats
}

module.exports = async(conn, msg, m, setting, store, welcome, recent) => {
	try {
		limitot -= 1
		let { ownerNumber, botName, gamewaktu, limitCount } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
		const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
		let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
		const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber == sender ? true : ["6285791458996@s.whatsapp.net", "436506699997000@s.whatsapp.net"].includes(sender) ? true : false
		const pushname = msg.pushName
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const isPremium = _prem.cekUser(sender, premium)
                const isWelcome = isGroup ? welcome.includes(from) ? true : false : false

		const gcounti = setting.gcount
		const gcount = isPremium ? gcounti.prem : gcounti.user

		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
        async function sendPlay(from, query) {
           var url = await yts(query)
           url = url.videos[0].url
           hxz.youtube(url).then(async(data) => {
             var button = [{ buttonId: `!ytmp3 ${url}`, buttonText: { displayText: `🎵 Audio (${data.size_mp3})` }, type: 1 }, { buttonId: `!ytmp4 ${url}`, buttonText: { displayText: `🎥 Video (${data.size})` }, type: 1 }]
             conn.sendMessage(from, { caption: `*Title :* ${data.title}\n*Quality :* ${data.quality}\n*Url :* https://youtu.be/${data.id}`, location: { jpegThumbnail: await getBuffer(data.thumb) }, buttons: button, footer: 'Pilih Salah Satu Button Dibawah⬇️', mentions: [sender] })
           }).catch((e) => {
             conn.sendMessage(from, { text: mess.error.api }, { quoted: msg })
               ownerNumber.map( i => conn.sendMessage(from, { text: `Send Play Error : ${e}` }))
           })
        }
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const sendText = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
			{ urlButton: { displayText: `My Website!`, url : `https://adinyahya.com` } },
			{ quickReplyButton: { displayText: `💰 Donasi`, id: `${prefix}donate` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
//		conn.sendReadReceipt(from, sender, [msg.key.id])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
		// Premium

		// Tictactoe
		if (isTicTacToe(from, tictactoe)) tictac(chats, prefix, tictactoe, from, sender, reply, mentions, addBalance, balance)

        // Game
		cekWaktuGame(conn, tebakgambar)
		if (isPlayGame(from, tebakgambar) && isUser) {
		  if (chats.toLowerCase() == getJawabanGame(from, tebakgambar)) {
		    var htgm = randomNomor(100, 150)
			addBalance(sender, htgm, balance)
		    reply(`*Selamat Jawaban Kamu Benar 🎉*\n\nJawaban : ${getJawabanGame(from, tebakgambar)}\nHadiah : ${htgm} balance\n\nIngin bermain lagi? ketik *${prefix}tebakgambar*`)
		    tebakgambar.splice(getGamePosi(from, tebakgambar), 1)
		  }
		}
		if (chats.includes("assalamualaikum")) {
			sendText("waalaikumusalam");
		}
		if (chats.includes("kapan sr") || chats.includes("kapan showroom") || chats.includes("sr kapan") || chats.includes("showroom kapan")) {
			sendText("kami tidak mengetahui kapan member akan showroom, namun kamu dapat menerima informasi saat member showroom dari kami");
		}
		if (chats.includes("kapan")) {
			sendText("gatau")
		}
		if (chats.includes("ada yang")) {
			sendText("sudah pasti ada dong!")
		}
		if (chats.includes("showroom")) {
			console.log("[ CEK SR ]");
			let resp = await fetchJson('https://jkt48-showroom-4353tvim4-pranendra99.vercel.app/api/rooms/onlives')
			let laistsr = `*📢 DAFTAR MEMBER YANG SHOWROOM*\n\n`

           		let dtae = resp.data
		      if (dtae.length > 0) {
	              for (let dam of dtae) {
	                laistsr += `👤 ${dam.main_name}\n`
        	        laistsr += `👥 ${dam.view_num} Penonton\n`
                	laistsr += `🔗 Tonton : https://www.showroom-live.com/r/${dam.room_url_key}?\n`
	                laistsr += `\n`
        	      }
	              laistsr += wmj
			sendText(laistsr);
			} else {
				sendText("tidak ada member showroom");
			}
		}
		switch (chats) {
			case "👍":
				sendText(chats);
			break
			case "🖕":
				sendText(chats);
			break
			case "p":
				sendText(chats);
			break
			case "😱":
				sendText(chats);
			break
			case "😱😱":
				sendText(chats);
			break
			case "🗿":
				sendText(chats);
			break
		}
		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
                        if (isPremium) {
				_prem.addPoint(sender, 10, premium)
                        }
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			if (isPremium) {
				_prem.addPoint(sender, 3, premium)
			}
			addBalance(sender, randomNomor(20), balance)
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		} else {
			if (isPremium) {
				_prem.addPoint(sender, 1, premium)
			}
			let pedanya = {
				name: pushname,
				number: sender,
				chat: chats
			}
			if (isGroup) {
				pedanya.grup = groupName
				pedanya.grup_id = groupId
			}
//			console.log(pedanya);
                }

		switch(command) {
	case prefix+"kont":
               conn.sendMessage(from, { text: 'apa' }, {quoted: msg})
	break
        case prefix+"log":
		if (sender!=="6281393668101@s.whatsapp.net") return conn.sendMessage(from, { text: "Only Owner" }, {quoted: msg})
		if (args.length < 2) return conn.sendMessage(from, { text: 'MODE : [LOG|DEBUG]' }, {quoted: msg})
		switch (args[1]) {
			case 'LOG':
				let yahu = `*💬 LIST LOG BOT*\n`
				for (let kona of recent) {
					yahu += `[LOG] ${kona.time} | ${kona.caption}\n`
				}
				conn.sendMessage(from, { text: yahu }, {quoted: msg})
			break
			case 'DEBUG':
				conn.sendMessage(from, { text: 'NULL' }, {quoted: msg})
			break
		}
	break
        case prefix+"recap":
             let nod = `*Berikut Recap JKT48

🔗 Weekly : https://gist.github.com/dandyraka/eab36aadc4efa75adeefe1bc61011902
🔗 Monthly : https://gist.github.com/dandyraka/094cbc8d303a79a6693466bee845226c

${wmj}
`
		conn.sendMessage(from, { text: nod }, {quoted: msg})
	break
        case prefix+"lastpm":
		let nud = `Berikut Last PM JKT48

🔗 Url : https://gist.github.com/dandyraka/a3977acb85a45e07d1af0a84e2f94855
🔗 Live : https://jkt48live.github.io/links

${wmj}
`
		conn.sendMessage(from, { text: nud }, {quoted: msg})
	break
        case prefix+"pmsubs":
		let nad = `Berikut List PM Subs JKT48

🔗 Url : https://gist.github.com/dandyraka/e43f2556831b147d164c69135c3747cf
🔗 Live : https://jkt48live.github.io/links

${wmj}`
	conn.sendMessage(from, { text: nad }, {quoted: msg})
	break
	case prefix+'tagall':
		conn.sendMessage(from, { text: "malas" }, {quoted: msg})
	break
	case prefix+'multisr':
	case prefix+'fullscreen':
	case prefix+'playersr':
	  let kad = `Tonton Showroom Full screen disini\n🔗 Tonton Full Screen : https://jkt48live.github.io/player3/player/`
	  conn.sendMessage(from, { text: kad }, {quoted: msg})
	break
        case prefix+'sr':
	case prefix+'showroom':
	case prefix+'onroom':
	case prefix+'onrooms':
	case prefix+'sr_on':
	case prefix+'list_sr':
	case prefix+'listsr':
	case prefix+'listshowroom':
	case prefix+'membersr':
           let listsr = `*📢 DAFTAR MEMBER YANG SHOWROOM*\n\n`
           let datk = await fetchJson('https://jkt48-showroom-4353tvim4-pranendra99.vercel.app/api/rooms/onlives')
	   let dutae = datk.data
	   if (dutae.length > 0) {
              for (let dam of dutae) {
		listsr += `👤 ${dam.main_name}\n`
		listsr += `👥 ${dam.view_num} Penonton\n`
		listsr += `🔗 Tonton : https://www.showroom-live.com/r/${dam.room_url_key}?\n`
		listsr += `\n`
              }
	      listsr += wmj
	      conn.sendMessage(from, { text: listsr }, {quoted: msg});
           } else {
              conn.sendMessage(from, { text: "tidak ada member sr saat ini" }, {quoted: msg});
	   }
        break
	case prefix+'late':
	case prefix+'activity':
	case prefix+'lastactivity':
		let post = await getTwitterPost('JKT48LiveX');
        	let caption = await post[0].caption()
		let mediaa = post[0].media
		let ago = post[0].ago
		let texts =`*💬 Last Activity Log*\n\n🗓️ Date : ${post[0].time}\n🕒 Time : ${ago}\n🔗 Live : https://jkt48live.github.io/links\n\n----------------------------------------------\n${caption}\n----------------------------------------------\n\n${wmj}`

		if(mediaa==null) {
   			conn.sendMessage(from, { text: texts }, {quoted: msg});
		} else {
			conn.sendMessage(from, { image : { url : mediaa[0] } }, {quoted: msg});
		}
	break
	case prefix+'saransr':
		let stk = await fetchJson('https://jkt48-showroom-4353tvim4-pranendra99.vercel.app/api/rooms/onlives')
		let dutaa = stk.data
		if (dutaa.length > 1) {
			let ssr = dutaa[Math.floor(Math.random() * dutaa.length)]
			let teksa = `*💬 Kamu mungkin bisa menonton ini*\n\n👤 ${ssr.main_name}\n👥 ${ssr.view_num}\n🔗 Tonton : https://www.showroom-live.com/r/${ssr.room_url_key}?\n🔗 Tonton fullscreen : https://jkt48live.github.io/player3/player/\n\n*JKT48 LIVE X* ( Whatsapp Bot )\nJKT48 の非フェラーボット [ KEBAB48 ]`
			conn.sendMessage(from, { text: teksa }, {quoted: msg});
		} else {
			conn.sendMessage(from, { text: "[ERROR] Mungkin Karna Tidak ada member showroom / juga member showroom hanya berjumlah 1" }, {quoted: msg});
		}
	break
	case prefix+'saranoshi':
	case prefix+'getoshi':
	case prefix+'oshigw':
		let taos = await getOshi()
		let memn = taos[Math.floor(Math.random() * taos.length)]
		let teksaef = `*💬 Kamu Mungkin Suka ${memn.name}*\n🔗 Detail : ${memn.detail}\n\n${wmj}`
		conn.sendMessage(from, { image : { url : memn.image }, caption: teksaef }, {quoted: msg});
	break
	case prefix+'memberjkt48':
		let taaos = await getOshi()
		let jud = `*💬 Berikut Daftar Member JKT48 & Trainee*\n`
		for (let sik of taaos) {
			jud += `👤 ${sik.name}\n`
			jud += `🔗 Link : ${sik.detail}\n\n`
		}
		jud += wmj
		conn.sendMessage(from, { image : { url : taaos[0].image }, caption: jud }, {quoted: msg});
	break
	case prefix+"srpremium":
		conn.sendMessage(from, { text: "coming soon" }, {quoted: msg});
	break
	case prefix+"cocokga":
		let jawaban_member = ["cocok","mungkin cocok","gak cocok","gak cocok banget"]
		let jawaban_admin = ["cocok","sangat cocok","cocok banget><"]
		if (isGroupAdmins) {
			conn.sendMessage(from, { text: jawaban_admin[Math.floor(Math.random() * jawaban_admin.length)] }, {quoted: msg});
		} else if(sender == "6281393668101@s.whatsapp.net" || sender == "6281344201668@s.whatsapp.net") {
			conn.sendMessage(from, { text: jawaban_admin[Math.floor(Math.random() * jawaban_admin.length)] }, {quoted: msg});
		} else {
			conn.sendMessage(from, { text: jawaban_member[Math.floor(Math.random() * jawaban_member.length)] }, {quoted: msg});
		}
	break
		case prefix+'menu': case prefix+'help':
		let textsa = `💬 List Command Bot\n/cocokga\n/memberjkt48\n/saranoshi\n/lastactivity\n/saransr\n/srpremium\n/lastpm\n/recap\n/multisr\n/sr\n/listsr\n/pmsubs\n\n${wmj}`
		conn.sendMessage(from, { text: textsa }, {quoted: msg});
	break
	case prefix+'today':
		console.log("DONE")
	break
	case prefix+'signup':
		if (isPremium) return conn.sendMessage(from, { text: 'Lu udah daptar bang' }, {quoted: msg})
		_prem.addUser(sender, pushname, premium)
                conn.sendMessage(from, { text: '[SYS] SUKSES TERDAFTAR' }, {quoted: msg});
	break
	case prefix+'profile':
		if (!isPremium) return conn.sendMessage(from, { text: 'Lu Gapunya Akun, bikin dulu /signup' }, {quoted: msg});
		let hekse = `*📁 JKT48 LIVE X - AUTOMATE BOT*\n_Home > Profile_\n\n* user name : ${isPremium.Username}\n* uid : ${isPremium.UID}\n* 48 Point : ${isPremium.data.Point}\n`
		if (isPremium.Oshimen !== {}) {
			hekse += `* Oshimen : ${isPremium.Oshimen.name}`
		}
		hekse += `\n\n* Voucher Ticket : ${isPremium.data.Limit}\n* Statuses : User\n\n*JKT48 LIVE X* ( Whatsapp Bot )\nJKT48 の非フェラーボット [ KEBAB48 ]`
		conn.sendMessage(from, { text: hekse }, {quoted: msg});
	break
	case prefix+'ingfo':
		conn.sendMessage(from, { text: 'Coming Soon' }, {quoted: msg});
	break
	case prefix+'spins':
		conn.sendMessage(from, { text: 'Coming Soon' }, {quoted: msg});
	break
	case prefix+'shop':
		conn.sendMessage(from, { text: 'Coming Soon' }, {quoted: msg});
	break
	case prefix+'tebak_jiko':
		conn.sendMessage(from, { text: 'Coming Soon' }, {quoted: msg});
	break
			/*Main Menu
			case prefix+'menu':
			case prefix+'help':
			    var teks = allmenu(sender, prefix, pushname, isOwner, isPremium, balance, limit, limitCount, glimit, gcount)
			    conn.sendMessage(from, { caption: teks, location: {}, templateButtons: buttonsDefault, mentions: [sender] })
				break
			case 'adin':
				reply(`Hi 👋 apa kamu mengenalku?, jika belum, sangat senang sekali jika kamu mau perkenalkan diri dulu sebelum lanjut percakapan ini. :D 😬`)
				break;
			case 'sayang':
				reply(`iya ayang akuuu 🤗.`)
				break;
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
		            break
			case prefix+'donate':
			case prefix+'donasi':
			    reply(`──「 MENU DONATE 」──\n\nHi ${pushname} 👋🏻\n\`\`\`GOPAY : 085755567917\`\`\`\n\`\`\`PULSA : 085755567917 (Indosat)\`\`\`\nTerimakasih donasi kamu sangat membantu\n──「 THX FOR YOU ! 」──`)
			    break
			case prefix+'owner':
			    for (let x of ownerNumber) {
			      sendContact(from, x.split('@s.whatsapp.net')[0], 'Owner', msg)
			    }
			    break
			// case prefix+'cekprem':
            // case prefix+'cekpremium':
            //     if (!isPremium) return reply(`Kamu bukan user premium, kirim perintah *${prefix}daftarprem* untuk membeli premium`)
            //     if (isOwner) return reply(`Lu owner bego!`)
            //     if (_prem.getPremiumExpired(sender, premium) == "PERMANENT") return reply(`PERMANENT`)
            //     let cekvip = ms(_prem.getPremiumExpired(sender, premium) - Date.now())
            //     let premiumnya = `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s)`
            //     reply(premiumnya)
            //     break
            // case prefix+'listprem':
            //     let txt = `List Prem\nJumlah : ${premium.length}\n\n`
            //     let men = [];
            //     for (let i of premium) {
            //         men.push(i.id)
            //         txt += `*ID :* @${i.id.split("@")[0]}\n`
            //       if (i.expired === 'PERMANENT') {
            //         let cekvip = 'PERMANENT'
            //         txt += `*Expire :* PERMANENT\n\n`
            //       } else {
            //         let cekvip = ms(i.expired - Date.now())
            //         txt += `*Expire :* ${cekvip.days} day(s) ${cekvip.hours} hour(s) ${cekvip.minutes} minute(s) ${cekvip.seconds} second(s)\n\n`
            //       }
            //     }
            //     mentions(txt, men, true)
            //     break
	        // Converter & Tools Menu*/
case prefix+'stats':
if (args.length < 2) return conn.sendMessage(from, { text:`💬 Berikut Daftar Menu stats\n\n/stats jkt48\n/stats limit\n\n${wmj}`} , { quoted : msg })
switch (args[1]) {
   case 'jkt48':
     let kintil = await statsjeke();
     let textka = `*📊 Statistik JKT48*\n_Data Berikut merupakan Realtime_\n\n👤 ${kintil.main_stats[0].title} : ${kintil.main_stats[0].count}\n👥 ${kintil.main_stats[1].title} : ${kintil.main_stats[1].count}\n👪 ${kintil.main_stats[2].title} : ${kintil.main_stats[2].count}\n\n`
     for (let kon of kintil.age_stats) {
      textka += `*${kon.title}*\n`
      textka += `_${kon.content}_\n`
     }
     textka += `\n${wmj}`
     conn.sendMessage(from, { text: textka } , { quoted : msg });
   break
   case 'limit':
     await conn.sendMessage(from, { text: `${limitot}` } , { quoted : msg });
   break
}
break


			 case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			 //    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				exif.create(`${sender}`, '@JKT48LiveX')
			 	if (isImage || isQuotedImage) {
		               var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			        var buffer = Buffer.from([])
			        for await(const chunk of stream) {
			           buffer = Buffer.concat([buffer, chunk])
			        }
			        var rand1 = 'sticker/'+getRandom('.jpg')
			        var rand2 = 'sticker/'+getRandom('.webp')
			        fs.writeFileSync(`./${rand1}`, buffer)
			        ffmpeg(`./${rand1}`)
			 	.on("error", console.error)
			 	.on("end", () => {
			 	  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
			 	    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg });
			 		fs.unlinkSync(`./${rand1}`)
			             fs.unlinkSync(`./${rand2}`)
				           })
			 	 })
			 	.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
			 	.toFormat('webp')
			 	.save(`${rand2}`)
			     } else if (isVideo || isQuotedVideo) {
			 	 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
			 	 var buffer = Buffer.from([])
			 	 for await(const chunk of stream) {
			 	   buffer = Buffer.concat([buffer, chunk])
		 	 	 }
			      var rand1 = 'sticker/'+getRandom('.mp4')
			 	 var rand2 = 'sticker/'+getRandom('.webp')
			          fs.writeFileSync(`./${rand1}`, buffer)
			          ffmpeg(`./${rand1}`)
			 	  .on("error", console.error)
			 	  .on("end", () => {
			 	    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
			 	      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg });
			 		  fs.unlinkSync(`./${rand1}`)
			 	      fs.unlinkSync(`./${rand2}`)
			 	    })
			 	  })
			 	 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
			 	 .toFormat('webp')
			 	 .save(`${rand2}`)
                 } else {
			        conn.sendMessage(from, { text: "waduh" }, {quoted:msg});
			     }
                 break
			///* case prefix+'toimg': case prefix+'toimage':
			// case prefix+'tovid': case prefix+'tovideo':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			//     if (!isQuotedSticker) return reply(`Reply stikernya!`)
			//     var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
			//     var buffer = Buffer.from([])
			//     for await(const chunk of stream) {
			//        buffer = Buffer.concat([buffer, chunk])
			//     }
			//     var rand1 = 'sticker/'+getRandom('.webp')
			//     var rand2 = 'sticker/'+getRandom('.png')
			//     fs.writeFileSync(`./${rand1}`, buffer)
			//     if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
			//     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
			//       fs.unlinkSync(`./${rand1}`)
			//       if (err) return reply(mess.error.api)
			//       conn.sendMessage(from, { image: { url: `./${rand2}` }}, { quoted: msg })
			//       limitAdd(sender, limit)
			// 	  fs.unlinkSync(`./${rand2}`)
			//     })
			//     } else {
			//     reply(mess.wait)
		    //       webp2mp4File(`./${rand1}`).then( data => {
			//        fs.unlinkSync(`./${rand1}`)
			//        conn.sendMessage(from, { video: { url: data.result }}, { quoted: msg })
			//        limitAdd(sender, limit)
			// 	  })
			//     }
			//     break
	        // Downloader Menu
			// case prefix+'tiktok':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			//     if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			//     if (!isUrl(args[1])) return reply(mess.error.Iv)
			//     if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			//     reply(mess.wait)
			//     xfar.Tiktok(args[1]).then( data => {
			//       conn.sendMessage(from, {
			// 	   video: { url: data.medias[0].url },
			// 	   caption: `${data.title}\n\nKamu bisa mengubahnya menjadi Vidio Tanpa Watermark atau Audio, pencet tombol dibawah untuk mengubahnya!`,
			// 	   buttons: [{buttonId: `${prefix}tiktoknowm ${args[1]}`, buttonText: { displayText: "Without Watermark" }, type: 1 },
			// 		{buttonId: `${prefix}tiktokaudio ${args[1]}`, buttonText: { displayText: "Audio" }, type: 1 }],
			// 	   footer: "Create by @yannnnn.zz_"
			//       }, { quoted: msg })
			// 	  limitAdd(sender, limit)
			//     }).catch(() => reply(mess.error.api))
			//     break
			// case prefix+'tiktoknowm':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			//     if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			//     if (!isUrl(args[1])) return reply(mess.error.Iv)
			//     if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			//     reply(mess.wait)
			//     hxz.ttdownloader(args[1]).then( data => {
			//       conn.sendMessage(from, { video: { url: data.nowm }}, { quoted: msg })
			//       limitAdd(sender, limit)
			// 	}).catch(() => reply(mess.error.api))
			//     break
			// case prefix+'tiktokaudio':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			//     if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			//     if (!isUrl(args[1])) return reply(mess.error.Iv)
			//     if (!args[1].includes('tiktok')) return reply(mess.error.Iv)
			//     reply(mess.wait)
			//     hxz.ttdownloader(args[1]).then( data => {
			//       conn.sendMessage(from, { audio: { url: data.nowm }, mimetype: 'audio/mp4' }, { quoted: msg })
			//        limitAdd(sender, limit)
			// 	}).catch(() => reply(mess.error.api))
		    //     break
            case prefix+'play':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
                if (args.length < 2) return reply(`Kirim perintah ${command} query\nContoh : ${command} monokrom`)
                reply(mess.wait)
                await sendPlay(from, q)
				limitAdd(sender, limit)
                break
			case prefix+'ytmp4': case prefix+'mp4':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'ytmp3': case prefix+'mp3':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Youtube(args[1]).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      conn.sendMessage(from, { document: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'getvideo': case prefix+'getvidio':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Video Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[1].quality}\n*≻ Size :* ${data.medias[1].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { video: { url: data.medias[1].url }, caption: teks }, { quoted: msg })
			       limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
		        break
			case prefix+'getmusik': case prefix+'getmusic':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (!isQuotedImage) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				if (!quotedMsg.fromMe) return reply(`Hanya bisa mengambil hasil dari pesan bot`)
				if (args.length < 2) return reply(`Balas hasil pencarian dari ${prefix}ytsearch dengan teks ${command} <no urutan>`)
				var kuoted = await quotedMsg.chats
                var ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/gi
                var arrey = [...kuoted.matchAll(ytIdRegex)].map(x => x[1])
                if (arrey.length == 0) return reply(`Reply hasil dari *${prefix}ytsearch* dengan perintah *${command}* urutan`)
                if (isNaN(args[1])) return reply(`Hanya support angka! pilih angka 1 sampai 10\nContoh : ${command} 2`)
                if (args[1] > arrey.length) return reply(`Urutan Hasil *${prefix}ytsearch* Hanya Sampai *${arrey.length}*`)
			    reply(mess.wait)
			    xfar.Youtube(`https://youtube.com/watch?v=${arrey[args[1] -1]}`).then( data => {
			      var teks = `*Youtube Audio Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Quality :* ${data.medias[7].quality}\n*≻ Size :* ${data.medias[7].formattedSize}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			      conn.sendMessage(from, { image: { url: data.thumbnail }, caption: teks }, { quoted: msg })
			      conn.sendMessage(from, { document: { url: data.medias[7].url }, fileName: `${data.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			case prefix+'igdl': case prefix+'instagram': case prefix+'ig':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
				if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('instagram.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Instagram(args[1]).then( data => {
			     var teks = `*Instagram Downloader*\n\n*≻ Title :* ${data.title}\n*≻ Jumlah Media :* ${data.medias.length}\n*≻ Url Source :* ${data.url}\n\n_wait a minute sending media..._`
			     reply(teks)
			     for (let i of data.medias) {
				  if (i.extension === "mp4") {
				   conn.sendMessage(from, { video: { url: i.url }})
				  } else if (i.extension === "jpg") {
				   conn.sendMessage(from, { image: { url: i.url }})
			      }
			     }
				 limitAdd(sender, limit)
			    }).catch(() => reply(mess.error.api))
			    break
			case prefix+'facebook': case prefix+'fbdl':
			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(mess.error.Iv)
			    if (!args[1].includes('facebook.com')) return reply(mess.error.Iv)
			    reply(mess.wait)
			    xfar.Facebook(args[1]).then( data => {
			      conn.sendMessage(from, { video: { url: data.medias[0].url }, caption: data.title }, { quoted: msg })
			      limitAdd(sender, limit)
				}).catch(() => reply(mess.error.api))
			    break
			// Owner Menu
			// case prefix+'exif':
			//     if (!isOwner) return reply(mess.OnlyOwner)
			//     var namaPack = q.split('|')[0] ? q.split('|')[0] : q
            //     var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
            //     exif.create(namaPack, authorPack)
			// 	reply(`Sukses membuat exif`)
			// 	break
			// case prefix+'leave':
			//     if (!isOwner) return reply(mess.OnlyOwner)
			// 	if (!isGroup) return reply(mess.OnlyGrup)
			// 	conn.groupLeave(from)
			//     break
			// case prefix+'join':
			//     if (!isOwner) return reply(mess.OnlyOwner)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} _linkgrup_`)
			// 	if (!isUrl(args[1])) return reply(mess.error.Iv)
			// 	var url = args[1]
			//     url = url.split('https://chat.whatsapp.com/')[1]
			// 	var data = await conn.groupAcceptInvite(url)
			// 	reply(jsonformat(data))
			// 	break
            //             case prefix+'bc': case prefix+'broadcast':
			//     if (!isOwner) return reply(mess.OnlyOwner)
		    //         if (args.length < 2) return reply(`Masukkan isi pesannya`)
            //                 var data = await store.chats.all()
            //                 for (let i of data) {
            //                    conn.sendMessage(i.id, { text: `${q}\n\n_*BROADCAST MESSAGE*_` })
            //                    await sleep(1000)
            //                 }
            //                 break
			// case prefix+'setpp': case prefix+'setppbot':
		    //     if (!isOwner) return reply(mess.OnlyOwner)
		    //     if (isImage || isQuotedImage) {
			// 	  var media = await downloadAndSaveMediaMessage('image', 'ppbot.jpeg')
			// 	  var data =  await conn.updateProfilePicture(botNumber, { url: media })
			//       fs.unlinkSync(media)
			// 	  reply(`Sukses`)
			// 	} else {
			// 	  reply(`Kirim/balas gambar dengan caption ${command} untuk mengubah foto profil bot`)
			// 	}
			// 	break
			// case prefix+'addprem':
            //     if (!isOwner) return reply(mess.OnlyOwner)
            //     if (args.length < 2) return reply(`Penggunaan :\n*${prefix}addprem* @tag waktu\n*${prefix}addprem* nomor waktu\n\nContoh : ${command} @tag 30d`)
            //     if (!args[2]) return reply(`Mau yang berapa hari?`)
            //     if (mentioned.length !== 0) {
            //         _prem.addPremiumUser(mentioned[0], args[2], premium)
            //         reply('Sukses')
            //     } else {
            //      var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
            //      if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
            //         _prem.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], premium)
            //         reply('Sukses')
            //     }
            //     break
            // case prefix+'delprem':
            //     if (!isOwner) return reply(mess.OnlyOwner)
            //     if (args.length < 2) return reply(`Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`)
            //     if (mentioned.length !== 0){
            //         premium.splice(_prem.getPremiumPosition(mentioned[0], premium), 1)
            //         fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
            //         reply('Sukses!')
            //     } else {
            //      var cekpr = await conn.oWhatsApp(args[1]+"@s.whatsapp.net")
            //      if (cekpr.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
            //         premium.splice(_prem.getPremiumPosition(args[1] + '@s.whatsapp.net', premium), 1)
            //         fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
            //         reply('Sukses!')
            //     }
            //     break
			// Random Menu
			// case prefix+'quote': case prefix+'quotes':
			// case prefix+'randomquote': case prefix+'randomquotes':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	var data = await fetchJson(`https://megayaa.herokuapp.com/api/randomquote`)
			//     reply(data.result.quotes+'\n\n-- '+data.result.author)
			// 	limitAdd(sender, limit)
			// 	break
			// case prefix+'cecan': case prefix+'cewek':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	reply(mess.wait)
			//     var query = ["cecan hd","cecan indo","cewe cantik", "cewe aesthetic", "cecan aesthetic"]
            //     var data = await pinterest(pickRandom(query))
			// 	var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
			// 	conn.sendMessage(from, { caption: "Random Cewe Cantik", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			//     limitAdd(sender, limit)
 			//     break
			// case prefix+'cogan': case prefix+'cowok':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	reply(mess.wait)
			// 	var query = ["cogan hd","cogan indo","cowo ganteng","handsome boy","hot boy","oppa","cowo aesthetic","cogan aesthetic"]
			// 	var data = await pinterest(pickRandom(query))
			// 	var but = [{buttonId: `${command}`, buttonText: { displayText: "Next Photo" }, type: 1 }]
			// 	conn.sendMessage(from, { caption: "Random Cowo Ganteng", image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			//     limitAdd(sender, limit)
			// 	break
			// Search Menu
			// case prefix+'lirik': case 'liriklagu':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} judul lagu`)
			// 	reply(mess.wait)
			//     ra.Musikmatch(q).then(async(data) => {
			// 	  var teks = `*${data.result.judul} - ${data.result.penyanyi}*\n\n${data.result.lirik}`
			// 	  conn.sendMessage(from, { image: { url: data.result.thumb }, caption: teks }, { quoted: msg })
			// 	}).catch(() => reply(`Judul lagu tidak ditemukan`))
			// 	limitAdd(sender, limit)
			// 	break
			// case prefix+'grupwa': case prefix+'searchgrup':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} nama grup`)
			// 	reply(mess.wait)
			//     hxz.linkwa(q).then(async(data) => {
			// 	  if (data.length == 0) return reply(`Grup ${q} tidak ditemukan`)
			// 	  var teks = `*Hasil Pencarian Dari ${q}*\n\n`
			// 	  for (let x of data) {
			// 		teks += `*Nama :* ${x.nama}\n*Link :* ${x.link}\n\n`
			// 	  }
			// 	  reply(teks)
			// 	  limitAdd(sender, limit)
			// 	}).catch(() => reply(mess.error.api))
			//     break
			// case prefix+'pinterest':
			//     if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} query atau ${command} query --jumlah\nContoh :\n${command} cecan atau ${command} cecan --10`)
			// 	reply(mess.wait)
			//     var jumlah;
			//     if (q.includes('--')) jumlah = q.split('--')[1]
			//     pinterest(q.replace('--'+jumlah, '')).then(async(data) => {
			// 	  if (q.includes('--')) {
			// 		if (data.result.length < jumlah) {
			// 		  jumlah = data.result.length
			// 		  reply(`Hanya ditemukan ${data.result.length}, foto segera dikirim`)
			// 		}
			// 		for (let i = 0; i < jumlah; i++) {
			// 		  conn.sendMessage(from, { image: { url: data.result[i] }})
			// 		}
			// 	    limitAdd(sender, limit)
			// 	  } else {
			// 		var but = [{buttonId: `${command} ${q}`, buttonText: { displayText: 'Next Photo' }, type: 1 }]
			// 		conn.sendMessage(from, { caption: `Hasil pencarian dari ${q}`, image: { url: pickRandom(data.result) }, buttons: but, footer: 'Pencet tombol dibawah untuk foto selanjutnya' }, { quoted: msg })
			// 	    limitAdd(sender, limit)
			// 	  }
			// 	})
			//     break
// 			case prefix+'yts': case prefix+'ytsearch':
// 			    if (isLimit(sender, isPremium, isOwner, limitCount, limit)) return reply (`Limit kamu sudah habis silahkan kirim ${prefix}limit untuk mengecek limit`)
// 			    if (args.length < 2) return reply(`Kirim perintah ${command} query`)
// 				reply(mess.wait)
// 			    yts(q).then( data => {
// 				  let yt = data.videos
// 				  var jumlah = 15
// 				  if (yt.length < jumlah) jumlah = yt.length
// 				  var no = 0
// 				  let txt = `*YOUTUBE SEARCH*

//  *Data berhasil didapatkan*
//  *Hasil pencarian dari ${q}*
 
//  *${prefix}getmusic <no urutan>*
//  *${prefix}getvideo <no urutan>*
//  Untuk mengambil Audio/Video dari hasil pencarian`
//                 for (let i = 0; i < jumlah; i++) {
// 				  no += 1
// 				  txt += `\n─────────────────\n\n*No Urutan : ${no.toString()}*\n*▢ Judul :* ${yt[i].title}\n*▢ ID :* ${yt[i].videoId}\n*▢ Channel :* ${yt[i].author.name}\n*▢ Upload :* ${yt[i].ago}\n*▢ Ditonton :* ${yt[i].views}\n*▢ Duration :* ${yt[i].timestamp}\n*▢ URL :* ${yt[i].url}\n`
// 				}
// 				conn.sendMessage(from, { image: { url: yt[0].image }, caption: txt }, { quoted: msg })
// 				limitAdd(sender, limit)
// 				}).catch(() => reply(mess.error.api))
// 			    break
			// Game Menu
			case prefix+'tictactoe': case prefix+'ttt': case prefix+'ttc':
                if (!isGroup)return reply(mess.OnlyGrup)
			    if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 2) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (mentionByTag.length !== 1) {
				if (mentionByTag[0] === botNumber) return reply(`Tidak bisa bermain dengan bot!`)
                if (mentionByTag[0] === sender) return reply(`Sad amat main ama diri sendiri`)
                     var hadiah = randomNomor(100, 150)
				     mentions(monospace(`@${sender.split('@')[0]} menantang @${mentionByTag[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/N) untuk bermain\n\nHadiah : ${hadiah} balance`), [sender, mentionByTag[0]], false)
                     tictactoe.push({
                        id: from,
                        status: null,
						hadiah: hadiah,
                        penantang: sender,
                        ditantang: mentionByTag[0],
                        TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                     })
					 gameAdd(sender, limit)
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
			case prefix+'delttt':
            case prefix+'delttc':
                if (!isGroup)return reply(mess.OnlyGrup)
				if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                var posi = getPosTic(from, tictactoe)
                if (tictactoe[posi].penantang.includes(sender)) {
                    tictactoe.splice(posi, 1)
                    reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (tictactoe[posi].ditantang.includes(sender)) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isGroupAdmins) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else if (isOwner) {
                     tictactoe.splice(posi, 1)
                     reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                 } else {
                   reply(`Anda tidak bisa menghapus sesi tictactoe, karena bukan pemain!`)
                }
                break
			case prefix+'tebakgambar':
		        if (isGame(sender, isOwner, gcount, glimit)) return reply(`Limit game kamu sudah habis`)
			    if (isPlayGame(from, tebakgambar)) return conn.reply(from, `Masih ada game yang belum diselesaikan`, tebakgambar[getGamePosi(from, tebakgambar)].msg)
				kotz.tebakgambar().then( data => {
				  data = data[0]
				  data.jawaban = data.jawaban.split('Jawaban ').join('')
				  var teks = `*TEBAK GAMBAR*\n\n`+monospace(`Petunjuk : ${data.jawaban.replace(/[b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z]/gi, '_')}\nWaktu : ${gamewaktu}s`)
				  conn.sendMessage(from, { image: { url: data.image }, caption: teks }, { quoted: msg })
				  .then( res => {
					var jawab = data.jawaban.toLowerCase()
					addPlayGame(from, 'Tebak Gambar', jawab, gamewaktu, res, tebakgambar)
					gameAdd(sender, glimit)
				  })
				})
			    break
			case prefix+'tesb':
			 reply("chat aman bos ku")
			break
			// Group Menu
			// case prefix+'linkgrup': case prefix+'link': case prefix+'linkgc':
			//     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	var url = await conn.groupInviteCode(from).catch(() => reply(mess.error.api))
			//     url = 'https://chat.whatsapp.com/'+url
			// 	reply(url)
			// 	break
			// case prefix+'setppgrup': case prefix+'setppgc':
			//     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins) return reply(mess.GrupAdmin)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	if (isImage || isQuotedImage) {
			// 	  var media = await downloadAndSaveMediaMessage('image', `ppgc${from}.jpeg`)
			//       await conn.updateProfilePicture(from, { url: media })
			// 	  .then( res => {
			// 		reply(`Sukses`)
			// 		fs.unlinkSync(media)
			// 	  }).catch(() => reply(mess.error.api))
			// 	} else {
			//       reply(`Kirim/balas gambar dengan caption ${command}`)
			// 	}
			// 	break
			// case prefix+'setnamegrup': case prefix+'setnamegc':
			//     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins) return reply(mess.GrupAdmin)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
			// 	await conn.groupUpdateSubject(from, q)
			//     .then( res => {
			// 	  reply(`Sukses`)
			// 	}).catch(() => reply(mess.error.api))
			//     break
			// case prefix+'setdesc': case prefix+'setdescription':
			//     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins) return reply(mess.GrupAdmin)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
			// 	await conn.groupUpdateDescription(from, q)
			//     .then( res => {
			//       reply(`Sukses`)
			// 	}).catch(() => reply(mess.error.api))
			// 	break
			// case prefix+'group': case prefix+'grup':
		    //     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins) return reply(mess.GrupAdmin)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	if (args.length < 2) return reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
			// 	if (args[1] == "close") {
			// 	  conn.groupSettingUpdate(from, 'announcement')
			// 	  reply(`Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`)
			// 	} else if (args[1] == "open") {
			// 	  conn.groupSettingUpdate(from, 'not_announcement')
			// 	  reply(`Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`)
			// 	} else {
			// 	  reply(`Kirim perintah ${command} _options_\nOptions : close & open\nContoh : ${command} close`)
			// 	}
			//     break
			// case prefix+'revoke':
			//     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins) return reply(mess.GrupAdmin)
			// 	if (!isBotGroupAdmins) return reply(mess.BotAdmin)
			// 	await conn.groupRevokeInvite(from)
			//     .then( res => {
			// 	  reply(`Sukses menyetel tautan undangan grup ini`)
			// 	}).catch(() => reply(mess.error.api))
			// 	break
			// case prefix+'hidetag':
		    //     if (!isGroup) return reply(mess.OnlyGrup)
			// 	if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
			//     let mem = [];
		    //     groupMembers.map( i => mem.push(i.id) )
			// 	conn.sendMessage(from, { text: q ? q : '', mentions: mem })
			//     break
            //             case prefix+'welcome':
            //                 if (!isGroup) return reply(mess.OnlyGrup)
            //                 if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
            //                 if (args.length < 2) return reply(`Pilih enable atau disable`)
            //                 if (args[1].toLowerCase() === "enable") {
            //                   if (isWelcome) return reply(`Welcome sudah aktif`)
            //                   welcome.push(from)
            //                   fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
            //                   reply(`Sukses mengaktifkan welcome di grup ini`)
            //                 } else if (args[1].toLowerCase() === "disable") {
            //                   if (!isWelcome) return reply(`Welcome sudah nonaktif`)
            //                   var posi = welcome.indexOf(from)
            //                   welcome.splice(posi, 1)
            //                   fs.writeFileSync('./database/welcome.json', JSON.stringify(welcome, null, 2))
            //                   reply(`Sukses menonaktifkan welcome di grup ini`)
            //                 } else {
            //                   reply(`Pilih enable atau disable`)
            //                 }
            //                 break
			// Bank & Payment Menu
			// case prefix+'topbalance':{
            //     balance.sort((a, b) => (a.balance < b.balance) ? 1 : -1)
            //     let top = '*── 「 TOP BALANCE 」 ──*\n\n'
            //     let arrTop = []
			// 	var total = 10
			// 	if (balance.length < 10) total = balance.length
            //     for (let i = 0; i < total; i ++){
            //         top += `${i + 1}. @${balance[i].id.split("@")[0]}\n=> Balance : $${balance[i].balance}\n\n`
            //         arrTop.push(balance[i].id)
            //     }
            //     mentions(top, arrTop, true)
            // }
            //     break
            // case prefix+'buylimit':{
            //     if (args.length < 2) return reply(`Kirim perintah *${prefix}buylimit* jumlah limit yang ingin dibeli\n\nHarga 1 limit = $150 balance`)
            //     if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            //     if (isNaN(args[1])) return reply(`Harus berupa angka`)
            //     if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            //     let ane = Number(parseInt(args[1]) * 150)
            //     if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            //     kurangBalance(sender, ane, balance)
            //     giveLimit(sender, parseInt(args[1]), limit)
            //     reply(monospace(`Pembeliaan limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Limit : ${getLimit(sender, limitCount, limit)}/${limitCount}`))
            // }
            //     break
			// case prefix+'transfer':
            // case prefix+'tf':{
            //      if (args.length < 2) return reply(`Kirim perintah *${command}* @tag nominal\nContoh : ${command} @6285791458996 2000`)
            //      if (mentioned.length == 0) return reply(`Tag orang yang ingin di transfer balance`)
            //      if (!args[2]) return reply(`Masukkan nominal nya!`)
            //      if (isNaN(args[2])) return reply(`Nominal harus berupa angka!`)
            //      if (args[2].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            //      if (args[2].includes("-")) return reply(`Jangan menggunakan -`)
            //      var anu = getBalance(sender, balance)
            //      if (anu < args[2] || anu == 'undefined') return reply(`Balance Kamu Tidak Mencukupi Untuk Transfer Sebesar $${args[2]}, Kumpulkan Terlebih Dahulu\nKetik ${prefix}balance, untuk mengecek Balance mu!`)
            //      kurangBalance(sender, parseInt(args[2]), balance)
            //      addBalance(mentioned[0], parseInt(args[2]), balance)
            //      reply(`Sukses transfer balance sebesar $${args[2]} kepada @${mentioned[0].split("@")[0]}`)
            // }
            //      break
            // case prefix+'buygamelimit':
            // case prefix+'buyglimit':{
            //     if (args.length < 2) return reply(`Kirim perintah *${prefix}buyglimit* jumlah game limit yang ingin dibeli\n\nHarga 1 game limit = $150 balance\nPajak $1 / $10`)
            //     if (args[1].includes('-')) return reply(`Jangan menggunakan -`)
            //     if (isNaN(args[1])) return reply(`Harus berupa angka`)
            //     if (args[1].toLowerCase() === 'infinity') return reply(`Yahaha saya ndak bisa di tipu`)
            //     let ane = Number(parseInt(args[1]) * 150)
            //     if (getBalance(sender, balance) < ane) return reply(`Balance kamu tidak mencukupi untuk pembelian ini`)
            //     kurangBalance(sender, ane, balance)
            //     givegame(sender, parseInt(args[1]), glimit)
            //     reply(monospace(`Pembeliaan game limit sebanyak ${args[1]} berhasil\n\nSisa Balance : $${getBalance(sender, balance)}\nSisa Game Limit : ${cekGLimit(sender, gcount, glimit)}/${gcount}`))
            // }
            //     break
			// case prefix+'limit': case prefix+'balance':
			// case prefix+'ceklimit': case prefix+'cekbalance':
			//     if (mentioned.length !== 0){
			// 		var Ystatus = ownerNumber.includes(mentioned[0])
			// 		var isPrim = Ystatus ? true : _prem.checkPremiumUser(mentioned[0], premium)
			// 	    var ggcount = isPrim ? gcounti.prem : gcounti.user
            //         var limitMen = `${getLimit(mentioned[0], limitCount, limit)}`
            //         textImg(`Limit : ${_prem.checkPremiumUser(mentioned[0], premium) ? 'Unlimited' : limitMen}/${limitCount}\nLimit Game : ${cekGLimit(mentioned[0], ggcount, glimit)}/${ggcount}\nBalance : $${getBalance(mentioned[0], balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
            //     } else {
            //         var limitPrib = `${getLimit(sender, limitCount, limit)}/${limitCount}`
            //         textImg(`Limit : ${isPremium ? 'Unlimited' : limitPrib}\nLimit Game : ${cekGLimit(sender, gcount, glimit)}/${gcount}\nBalance : $${getBalance(sender, balance)}\n\nKamu dapat membeli limit dengan ${prefix}buylimit dan ${prefix}buyglimit untuk membeli game limit`)
            //     }
			// 	break*/
			default:
			if (!isGroup && isCmd) {
				console.log("loh");
			}
		}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
