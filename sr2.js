"use strict";
const axios = require('axios');
const cron = require('node-cron');
const { serialize, getBuffer, fetchJson, sleep } = require("./lib/myfunc");
let api = `https://48live-showroom.vercel.app/api`
let lives = api+"/lives"
let rooms = api+"rooms"
let conn = null
let grup = []

let member = []
let recent_msg = []

async function bc(text, img) {
for (let gr of grup) {
	await conn.sendMessage(gr.id, { image : { url : img }, caption: text, mentions: gr.members})
	await sleep(1000);
}
}

const cekMember = (roomId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].roomId === roomId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const cekAda = (roomId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].roomId === roomId) {
            position = i
        }
    })
    if (position !== null) {
        return true
    } else {
        return false
    }
}

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

function hitungHargaGold(jumlahGold) {
  const hargaGoldPerYen = 1.1;
  const jumlahYen = jumlahGold * hargaGoldPerYen;

  const nilaiTukarYenKeRupiah = 13;
  const jumlahRupiah = 106.34 * jumlahGold
  const hasil = formatter.format(jumlahRupiah);
  return hasil;
}

function removeObjectWithId(arr, id) {
  // Making a copy with the Array from() method
  const arrCopy = Array.from(arr);

  const objWithIdIndex = arrCopy.findIndex((obj) => obj.roomId === id);
  arrCopy.splice(objWithIdIndex, 1);
  return arrCopy;
}

async function newlive(newText, tys) {
let srdate = mommenta.unix(newText.started_at).tz("Asia/jakarta").format('dddd, DD MMMM YYYY');
let srclock = mommenta.unix(newText.started_at).tz("Asia/jakarta").format("HH:mm");
let srtype = ""
if (newText.is_premium == 0) {
   srtype += "showroom"
} else {
   srtype += "showroom premium"
}
let teca = `Si ${newText.name} live ${srtype}!

🗓️ ${srdate} | ${srclock} WIB
🔗 View: https://www.showroom-live.com/r/${newText.room_url_key}?
🔗 View Fullsreen: https://48live-showroom.vercel.app/player/${newText.roomId}

informasi live akan dikirim pada reply quoted ini`
if (tys == 1) {
await bc(teca, newText.image)
}
console.log(teca);

}

function cekLive(newText) {
  if (!cekAda(newText.roomId, member)) {
    let wak = mommenta.unix(newText.started_at).tz("Asia/jakarta").format("HH:mm") == mommenta(new Date()).tz("Asia/jakarta").format("HH:mm");
    console.log(wak)
    if (wak) {
        console.log("[ LIVE ]");
	newlive(newText, 1)
    } else {
      if (member.length > 0) {
         var adaga = member[member.length - 1].roomId == newText.roomId
 	 if (!adaga) {
 	 	newlive(newText, 0)
	}
      } else {
        newlive(newText, 0)
      }
    }
    // Add new text to the recent list
    member.push(newText);
    // Print new text to the console
  } else {
    if (member.length > 0) {
     let posa = cekMember(newText.roomId, member)
     if(member[posa].view < newText.view) {
	     member[posa].view = newText.view
     }
     member[posa].command = newText.command
     if(member[posa].gift < newText.gift) {
	     member[posa].gift = newText.gift
    }
    }
  }
}

// Fungsi untuk mengambil jumlah komentar
async function getCommentCount(showroomId) {
  try {
    const response = await axios.get(`https://www.showroom-live.com/api/live/comment_log?room_id=${showroomId}`);
//    const response = await axios.get(`https://www.showroom-live.com/api/live/comment?room_id=${showroomId}`);
    let commentCount = response.data.length;
    return commentCount;
  } catch (error) {
    return 0;
  }
}

// Fungsi untuk mengambil informasi jumlah gold

async function getGoldCount(id) {
  try {
	const response = await axios.get(`https://www.showroom-live.com/api/live/gift_list?room_id=${id}`);
	await sleep(1000);
	const toa = await axios.get(`https://www.showroom-live.com/api/live/gift_log?room_id=${id}`)
	//let response = {data:{"enquete":[{"icon":0,"is_hidden":false,"order_no":10001,"gift_type":2,"image":"ht>
	await waitTime(1000);
	let su = response.data.normal
	let si = toa.data.gift_log
	//console.log(su)
	let tol = 0
	for (let njay of si) {
	let position = null
	    Object.keys(su).forEach((i) => {
	        if (su[i].gift_id === njay.gift_id) {
	            position = i
	        }
	    })
	    if (position !== null) {
	        tol += su[position].point
	    }
	}
	return tol;
  } catch (error) {
    console.log(error)
    return 0
  }
}

let last = [388483286]
let last_no = []
// Function to deactivate the API endpoint
async function deactivateEndpoint() {
  try {
    let siki = mommenta(new Date()).tz("Asia/jakarta").format("HH:mm");
    // Send a GET request to the API endpoint
    const response = await axios.get('https://48live-showroom.vercel.app/api/rooms/onlives');
    console.log("* get infonsr "+siki)
    // Check if there are any live members
    const liveMembers = response.data.data.filter(member => member.live_id);
//    console.log(liveMembers);
    if (liveMembers.length > 0) {
      // Deactivate the endpoint if there are live members
      // Add your code to deactivate the API endpoint here
      for (let sr of liveMembers) {
	let data_live = {
		name: sr.main_name,
		roomId: sr.room_id,
		is_premium: sr.premium_room_type,
		room_url_key: sr.room_url_key,
		image: sr.image,
		started_at: sr.started_at,
		view: sr.view_num,
		command: 0,
		gift: 0
	}
	 if (last.length > 0 && last[last.length - 1] !== sr.started_at) {
		console.log("gas "+siki)
//		const ingfi = await getCommentCount(sr.room_id)
		data_live.gift = 0
		data_live.command = 0
		cekLive(data_live)
         }
	await sleep(1000);
      }
      // Example: Updating a flag to indicate the endpoint is deactivated
      isEndpointActive = false;
    } else {
//	getin.push(liveMembers);
	console.log("gada sr "+siki)
   }
  } catch (error) {
    //fonsolekdoek
  }
}

// Example: Simulating a periodic check every 10 seconds
//const interval = setInterval(deactivateEndpoint, 10000);

/*const cekMember = (roomId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].roomId === roomId) {
            position = i
        }
    })
    if (position !== null) {
        return posution
    }
}*/



var mommenta = require('moment-timezone')
async function selesaiSr(posi) {
try {
var ini = member[posi]
var nama = ini.name
var showroomStartTimes = ini.started_at
var roomId = ini.roomId
let response = await axios.get("https://dc.crstlnz.site/api/showroom/recent")
let data = response.data.recents[0]
if (data.member.name == nama || ini.is_premium == 1) {
	let res = await axios.get("https://dc.crstlnz.site/api/showroom/recent/"+data.data_id)
	let srdata = res.data
	var unixStart = mommenta.unix(showroomStartTimes).tz("Asia/jakarta").format("YYYY-MM-DD HH:mm:ss")
	var start = mommenta(srdata.live_info.date.start).tz("Asia/jakarta").format("YYYY-MM-DD HH:mm:ss")
	var end = mommenta(srdata.live_info.date.end).tz("Asia/jakarta").format("YYYY-MM-DD HH:mm:ss")
	const zonaWaktu = 'Asia/Jakarta';

	// Mengatur jam mulai dan jam berhenti
	const jamMulai = mommenta.tz(start, "YYYY-MM-DD HH:mm:ss", zonaWaktu);
	const jamBerhenti = mommenta.tz(end, "YYYY-MM-DD HH:mm:ss", zonaWaktu);

	// Menghitung selisih waktu
	const selisihWaktu = jamBerhenti.diff(jamMulai);
	let srdate = mommenta(start).tz("Asia/jakarta").format('dddd, DD MMMM YYYY');
	let srclock = mommenta(start).tz("Asia/jakarta").format("HH:mm");
	let srdate_end = mommenta(end).tz("Asia/jakarta").format('dddd, DD MMMM YYYY');
	let srclock_end = mommenta(end).tz("Asia/jakarta").format("HH:mm");
	// Mengonversi selisih waktu menjadi durasi dalam milidetik
	const durasi = mommenta.duration(selisihWaktu);

	if (ini.is_premium == 0) {
		const giftnya = data.points
		const tek = `🎉 Live ${nama} Telah berakhir guys,
Oshimu telah mewarnai harimu selama ${durasi.hours()}:${durasi.minutes()}:${durasi.seconds()}

Start: ${srdate} | ${srclock} WIB
End: ${srdate_end}  | ${srclock_end} WIB

👥 ${data.live_info.viewers} Penonton
💬 ${srdata.live_info.comments.num} Komentar
🎁 ${giftnya}G (± ${hitungHargaGold(giftnya)})

Terimakasih atas showroomnya @${ini.room_url_key} hari ini`
		bc(tek, ini.image);
	} else {
		const jamMula = mommenta.tz(unixStart, "YYYY-MM-DD HH:mm:ss", zonaWaktu);
		const jamBerhent = mommenta.tz(new Date(), "YYYY-MM-DD HH:mm:ss", zonaWaktu);
		const selisihWakt = jamBerhent.diff(jamMula);
		const duras = mommenta.duration(selisihWakt);
		const tauk = `🎉 Live ${nama} Telah berakhir guys,
menemani harimu selama ${duras.hours()}:${duras.minutes()}:${duras.seconds()}

Start: ${mommenta(unixStart).tz("Asia/jakarta").format('dddd, DD MMMM YYYY')} | ${mommenta(unixStart).tz("Asia/jakarta").format('HH:mm')} WIB
End: ${mommenta(jamBerhent).tz("Asia/jakarta").format('dddd, DD MMMM YYYY')}  | ${mommenta(jamBerhent).tz("Asia/jakarta").format("HH:mm")} WIB

👥 ${ini.view} Penonton`
		bc(tauk, ini.image);
	}
}
} catch(err) {
recent_msg.push(err)
console.log(err);
}
}

async function cekada(roomId) {
//	console.log("masuk fet")
	let response = await axios.get(`https://www.showroom-live.com/api/room/profile?room_id=${roomId}`);
//	console.log("[STATUS CHECK]");
	return response.data;
}

//const interval = setInterval(deactivateEndpoint, 10000);
// Example: Simulating a finish live event
module.exports = async(client) => {
	conn = client
	console.log(" [ START ] ")
	let ank = ['120363155229879841@g.us','120363139489972450@g.us']
	for (let i of ank) {
		console.log("ya")
		await sleep(1000);
		grup.push({id: i, members: []})
//		await sleep(2000);
	}
	console.log(grup)
	cron.schedule('*/10 * * * * *', async function () {
/*         let siki = mommenta(new Date()).tz("Asia/jakarta").format("HH:mm");
	 switch(siki) {
		case '04:00':
			last = [388483286]
			console.log("* RESET TIME JAM 4");
		break
		case '02:10':
			let ini = mommenta(new Date()).tz("Asia/jakarta").format('dddd');
			let th_show = await require('./theater')();
			if (th_show.statuses == 200) {
				if (ini.includes("Senin")) {
					let teu = `Berikut adalah jadwal show Minggu ini\n`
					for (let th of th_show.data) {
						let th_sh = mommenta(th.date + ' ' + th.time).tz("Asia/jakarta").format('dddd, DD MMMM YYYY');
						teu += '\n'
						teu += th.title + '\n'
						teu += '🗓️' + th_sh + '\n'
						teu += '🕒' + th.time + '\n'
						teu += '👥' + th.member.join(', ') + '\n'
						if (th.seinbatsu.length > 0) {
							teu += '🎂' + th.seinbatsu.join(', ') + '\n'
						}
						teu += '\n'
					}
					console.log(teu);
				}
			}
		break
	 }*/
	 console.log("[ CEK ]");
	 console.log(member)
	  // Add your code to handle the finish live event here
	  if (member.length > 0) {
		for (let mem of member) {
			let response = await cekada(mem.roomId)
			await sleep(1000);
			if (response.is_onlive == false) {
				let posm = cekMember(mem.roomId, member)
				await selesaiSr(posm)
				await sleep(1000);
				last.push(mem.started_at)
				member = removeObjectWithId(member, mem.roomId)
				console.log(member)
				console.log(last)
			}
		}
	  }
	  await deactivateEndpoint();
	  // Example: Updating a flag to indicate the endpoint is active
	  isEndpointActive = true;
	  // Restart the periodic check after the live event finishes
	//  clearInterval(interval);
	//  setInterval(deactivateEndpoint, 10000);
	});
}
