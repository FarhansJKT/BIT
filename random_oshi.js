let cheerio = require('cheerio')
const fetch = require('node-fetch');


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

case prefix+'stats':
if (args.length < 2) return msg.reply(`💬 Berikut Daftar Menu stats\n\n/stats jkt48\n/stats limit\n\n${wmj}`)
switch (args[1]) {
   case 'jkt48':
     let kintil = await statsjeke();
     let textka = 
`*📊 Statistik JKT48*\n_Data Berikut merupakan Realtime_\n\n👤 ${kintil.main_stats[0].title} :
${kintil.main_stats[0].count}\n👥 ${kintil.main_stats[1].title} : ${kintil.main_stats[1].count}\n
👪 ${kintil.main_stats[2].title} : ${kintil.main_stats[2].count}\n\n`
     for (let kon of kintil.age_stats) {
      textka += `*${kon.title}*\n`
      textka += `_${kon.content}_\n`
     }
     textka += `\n${wmj}`
     conn.sendMessage(from, { text: textka } , { quoted : msg });
   break
   case 'limit':
     conn.sendMessage(from, { text: limitot } , { quoted : msg });
   break
}
break

async function tot(){
post = await getOshi();
console.log(post);
}

tot()
