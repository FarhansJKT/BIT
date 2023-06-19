const fs = require("fs");
const moment = require('moment')
const momenta = require('moment-timezone')
const chalk = require('chalk')
const fetch = require('node-fetch');
const { load } = require('cheerio');
const { serialize, getBuffer, fetchJson, sleep } = require("./lib/myfunc");
const dela = `window.__NUXT__ = (function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, _, $, aa, ab, ac, ad, ae, af, ag, ah, ai, aj, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA, aB, aC, aD, aE, aF, aG, aH, aI, aJ, aK, aL, aM, aN, aO, aP, aQ, aR, aS, aT, aU, aV, aW, aX, aY, aZ, a_, a$, ba, bb, bc, bd, be, bf, bg, bh, bi, bj, bk, bl, bm, bn, bo, bp, bq, br, bs, bt, bu, bv, bw, bx, by, bz, bA, bB, bC, bD, bE, bF, bG, bH, bI, bJ, bK, bL, bM, bN, bO, bP, bQ, bR, bS, bT, bU, bV, bW, bX, bY, bZ, b_, b$, ca, cb, cc, cd, ce, cf, cg, ch, ci, cj, ck, cl, cm, cn, co, cp, cq, cr, cs, ct, cu, cv) {            as.id = 23424846;            as.name = at;            as.country = at;            as.countryCode = l;            as.type = d;            as.clickable = c;            as.children = a;`
const delf = `}(void 0, false, true, "COUNTRY", "JKT48 Live", "JKT48LiveX", "https:\u002F\u002Fpbs.twimg.com\u002Fprofile_images\u002F1649773441975984128\u002FIP60WVFo_400x400.jpg", 0, 1, "showroom-live.com\u002Fpremium_live\u002Fo…", "1649644356964597762", "ID", "N_CathyJKT48", "Freya_JKT48", "R_AdelJKT48", "Michie_JKT48", 600000, 60000, 200, "showroom-live.com\u002Fr\u002FJKT48_Cathy?…", "photo", "JKT48LiveX's tweet video.", "showroom-live.com\u002Fr\u002FofficialJKT4…", "L_MarshaJKT48", "AU_LiaJKT48", "Cathleen Nixie", "1586992742093103104", "A_ZeeJKT48", "Freya Jayawardana", "4722555409", "Reva Fidela", "1148250023303401472", "Michelle Alexandra", "1586998054384586753", "A_ChristyJKT48", null, 100, 16, 124, 127, 104, 33, 97, 20, 6, 18, 288, "Marsha Lenathea", "1222075070404689922", 1685174400000, "Algeria", "Argentina", "Australia", "Austria", "Bahrain", "Belarus", "Belgium", "Brazil", "Canada", "Chile", "Colombia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "France", "Germany", "Ghana", "Greece", "Guatemala", "India", "IN", {}, "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Russia", "Saudi Arabia", "SA", "Singapore", "SG", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Venezuela", "Vietnam", 180000, 27, "Aurellia", "1487068053116362757", 25, "showroom-live.com\u002Fr\u002FJKT48_Lia?t=…", 101, 24, 1685289203000, "Gracie_JKT48", 1685284323000, "AA_AlyaJKT48", 169, 182, "showroom-live.com\u002Fr\u002FJKT48_Gracie…", "showroom-live.com\u002Fr\u002FJKT48_Alya?t…", 103, "https:\u002F\u002Ft.co\u002F1uCjeiYKKe", 1630, 1685275811000, "https:\u002F\u002Ft.co\u002Fjo6kgSh7lw", 68, 139, "https:\u002F\u002Ft.co\u002FiFQPONl6FD", 512, 1.7777777777777777, 90, "https:\u002F\u002Ft.co\u002FMQb1XjHf1Z", "1394249284736864258", "vvotanet", "https:\u002F\u002Ft.co\u002FLZAh9YbE1Q", 1685263601000, 29, 130, 153, 49, "Azizi Asadel", "1051522644988686341", 79, 129, 142, 115, "Angelina Christy", "1057323534551142400", 10, "S_AshelJKT48", 164, 61, 73, 85, 134, 157, "1662681207539388417", "jkt48.com\u002Fnews\u002Fdetail\u002Fid…", "showroom-live.com\u002Fr\u002FJKT48_Flora?…", "showroom-live.com\u002Fr\u002FJKT48_Chelse…", 137, "https:\u002F\u002Ft.co\u002Fcml2e03dxH", "C_JessiJKT48", "SW_RaishaJKT48", 112, "A_FionyJKT48", "SP_IndiraJKT48", "gist.github.com\u002Fdandyraka\u002Feab3…", "Kirim", "Penggunaan bebas iklan", "Coba cari yang lain.", "Tentang kami"));`
let kam = `}(void 0, false, true, "COUNTRY", "JKT48 Live", "JKT48LiveX", "https:\u002F\u002Fpbs.twimg.com\u002Fprofile_images\u002F1649773441975984128\u002FIP60WVFo_400x400.jpg", 0, 1, "showroom-live.com\u002Fpremium_live\u002Fo…", "1649644356964597762", "ID", "N_CathyJKT48", "Freya_JKT48", "R_AdelJKT48", "Michie_JKT48", 600000, 60000, 200, "showroom-live.com\u002Fr\u002FJKT48_Cathy?…", "photo", "JKT48LiveX's tweet video.", "showroom-live.com\u002Fr\u002FofficialJKT4…", "L_MarshaJKT48", "AU_LiaJKT48", "Cathleen Nixie", "1586992742093103104", "A_ZeeJKT48", "Freya Jayawardana", "4722555409", "Reva Fidela", "1148250023303401472", "Michelle Alexandra", "1586998054384586753", "A_ChristyJKT48", null, 100, 16, 124, 127, 104, 33, 97, 20, 6, 18, 288, "Marsha Lenathea", "1222075070404689922", 1685174400000, "Algeria", "Argentina", "Australia", "Austria", "Bahrain", "Belarus", "Belgium", "Brazil", "Canada", "Chile", "Colombia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "France", "Germany", "Ghana", "Greece", "Guatemala", "India", "IN", {}, "Indonesia", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Korea", "Kuwait", "Latvia", "Lebanon", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Russia", "Saudi Arabia", "SA", "Singapore", "SG", "South Africa", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Venezuela", "Vietnam", 180000, 27, "Aurellia", "1487068053116362757", 25, "showroom-live.com\u002Fr\u002FJKT48_Lia?t=…", 101, 24, 1685289203000, "Gracie_JKT48", 1685284323000, "AA_AlyaJKT48", 169, 182, "showroom-live.com\u002Fr\u002FJKT48_Gracie…", "showroom-live.com\u002Fr\u002FJKT48_Alya?t…", 103, "https:\u002F\u002Ft.co\u002F1uCjeiYKKe", 1630, 1685275811000, "https:\u002F\u002Ft.co\u002Fjo6kgSh7lw", 68, 139, "https:\u002F\u002Ft.co\u002FiFQPONl6FD", 512, 1.7777777777777777, 90, "https:\u002F\u002Ft.co\u002FMQb1XjHf1Z", "1394249284736864258", "vvotanet", "https:\u002F\u002Ft.co\u002FLZAh9YbE1Q", 1685263601000, 29, 130, 153, 49, "Azizi Asadel", "1051522644988686341", 79, 129, 142, 115, "Angelina Christy", "1057323534551142400", 10, "S_AshelJKT48", 164, 61, 73, 85, 134, 157, "1662681207539388417", "jkt48.com\u002Fnews\u002Fdetail\u002Fid…", "showroom-live.com\u002Fr\u002FJKT48_Flora?…", "showroom-live.com\u002Fr\u002FJKT48_Chelse…", 137, "https:\u002F\u002Ft.co\u002Fcml2e03dxH", "C_JessiJKT48", "SW_RaishaJKT48", 112, "A_FionyJKT48", "SP_IndiraJKT48", "gist.github.com\u002Fdandyraka\u002Feab3…", "Kirim", "Penggunaan bebas iklan", "Coba cari yang lain.", "Tentang kami"));`

async function getlink() {
/*const response = await fetch('https://sotwe.com/JKT48LiveX');
const body = await response.text()*/
let body = fs.readFileSync('./sc.txt');
//let body = fs.readFileSync('./tes.html');
let $ = load(body);
let card = []
let data = []




/*$('div[infinite-scroll-disabled="busy"]').each(function (index, element) {
 card.push($(element).html());
})
let A = load(card[0]);
let cardd = A('div')
cardd.each((i, div) => {
 data.push(A(div).html())
});
/*let ne = {}
ne.time = []
ne.kapan = []
ne.text = []
    A('span').find('time').each(function (ind, elm) {
      ne.time.push(A(elm).attr('datetime'));
    });
    A('span').find('time').each(function (tiara, mia) {
      ne.kapan.push(A(mia).html());
    });
    A('div[class="v-card__text body-1 text--primary tweet-text"]').each(function (nikita, wiji) {
      let se = A(wiji).text()
      if (!se == '') {
        ne.text.push(A(wiji).text());
      }
    });
    data.push(ne)
console.log(data[0].text.length)
console.log(data[0].kapan.length)
console.log(data[0].time.length)
for (let s of data) {
console.log(s)
console.log("\n[TOT]        [TOT]          [TOT]\n")
}*/
}
getlink()
