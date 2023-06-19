var mommenta = require('moment-timezone')

// Assuming you have a member object with a 'showroomStartTime' property
var showroomStartTimes = 1686718895

// You can also store the start time in a database or any other persistent storage
// Make sure to save the member object with the updated start time
// Assuming you have a member object with a 'showroomStartTime' property
showroomStartTime = mommenta(showroomStartTimes).tz("Asia/jakarta").format("HH-mm")
showroomEndTime = mommenta(new Date()).tz("Asia/jakarta").format("HH-mm")
showroomDuration = showroomEndTime - showroomStartTime

var start = mommenta.unix(showroomStartTimes).tz("Asia/jakarta").format("HH:mm:ss")
var end = mommenta(new Date()).tz("Asia/jakarta").format("HH:mm:ss")
console.log(start)
console.log(end)

// Menentukan zona waktu
const zonaWaktu = 'Asia/Jakarta';

// Mengatur jam mulai dan jam berhenti
const jamMulai = mommenta.tz(start, "HH:mm:ss", zonaWaktu);
const jamBerhenti = mommenta.tz(end,"HH:mm:ss", zonaWaktu);

// Menghitung selisih waktu
const selisihWaktu = jamBerhenti.diff(jamMulai);

// Mengonversi selisih waktu menjadi durasi dalam milidetik
const durasi = mommenta.duration(selisihWaktu);
const nama = "Jeane /ジーン（JKT48)"
// Menampilkan hasil
console.log(`🎉 Live ${nama} Telah berakhir guys,\ndan telah mewarnai harimu selama ${durasi.hours()}:${durasi.minutes()}:${durasi.seconds()}`)


// Calculate the duration in minutes
showroomDurationMinutes = Math.floor(showroomDuration / 1000 / 60);

// You can then use the duration as needed, such as saving it to a database or displaying it
console.log('Showroom duration (minutes):', showroomDurationMinutes);
