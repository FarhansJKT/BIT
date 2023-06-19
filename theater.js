"use strict";
const axios = require('axios');
const cheerio = require('cheerio');
var mommenta = require('moment-timezone')
function gettime(time) {
	let tame = time.split("Show")[0].split(",")[1].trim()
	let tume = time.split("Show")[1].trim()
	let wak = tame.replaceAll(".", "/")
	let wik = tume
	return [wak, wik, `${wak} ${wik}`]
}

async function getSc() {
const data_theater = []
axios.get('https://jkt48.com/theater/schedule') // Ganti dengan URL sesuai kebutuhan Anda
  .then(response => {
    const $ = cheerio.load(response.data);
    const tables = $('.entry-mypage__history .table-responsive .table'); // Ganti dengan kelas CSS yang sesuai dengan tabel yang diinginkan

    if (tables.length > 1) {
      const secondTable = tables.eq(1);
      const tbody = secondTable.find('tbody');

      // Mengolah tbody di sini
      tbody.find('tr').each((index, element) => {
        // Mendapatkan data dari setiap baris (tr)
        const row = $(element);
        const data1 = row.find('td:nth-child(1)').text();
        const data2 = row.find('td:nth-child(2)').text();
	const waktu = gettime(data1)
        // Lakukan operasi lain dengan data tersebut
        const data_schedule = {}
	data_schedule.title = data2
	data_schedule.date = waktu[0]
	data_schedule.time = waktu[1]
	data_schedule.member = []
	data_schedule.seinbatsu = []
	row.find('td:nth-child(3) a').each((mas, el) => {
		let namamem = $(el).text()
		if (data_schedule.member.includes(namamem)) {
			data_schedule.seinbatsu.push(namamem)
		} else {
			data_schedule.member.push(namamem)
		}
	});
	data_theater.push(data_schedule)
//	console.log(data_theater)
      });
	return {
		statuses: 200,
		data : data_theater
	}
    } else {
	return {
		statuses: 100,
		data : []
	}
    }
  })
  .catch(error => {
    console.log('Terjadi kesalahan:', error);
    return {
	statuses: 0,
	data : []
    }
  });

}

let sr = getSc()
console.log(sr)
