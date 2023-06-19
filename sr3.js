const axios = require('axios');
const cron = require('node-cron');
const { serialize, getBuffer, fetchJson, sleep } = require("./lib/myfunc");
let api = `https://48live-showroom.vercel.app/api`
let livesa = api+"/lives"
let roomsa = api+"rooms"

/*(async () => {
    // トークン取得
    const tokenRes = await fetch(
        `https://www.showroom-live.com/api/csrf_token`
    )
    const tokenResJson = await tokenRes.json()
    const csrfToken = tokenResJson.csrf_token
    console.log(csrfToken)

    // URL Key取得
    const room_url_key = "JKT48_Indira"
    console.log(room_url_key)

    // LIVE ID取得
    const statusRes = await fetch(
        `https://www.showroom-live.com/api/room/status?room_url_key=${room_url_key}`
    )
    const statusResJson = await statusRes.json()
    const liveId = statusResJson.live_id
    console.log(liveId)

    let countElm = document.createElement("li");
    countElm.setAttribute("id", "count-start");
    let countTextElm = document.createElement("a");
    countTextElm.setAttribute("id", "count-text");
    countTextElm.textContent = "ｶｳﾝﾄ";
    countTextElm.style.color = "white";
    countTextElm.style.marginLeft = "1em";
    countTextElm.style.cursor = "pointer";
    countElm.append(countTextElm);

    let freeGiftElm = document.createElement("li");
    freeGiftElm.setAttribute("id", "throw-free");
    let freeGiftTextElm = document.createElement("a");
    freeGiftTextElm.setAttribute("id", "throw-free-text");
    freeGiftTextElm.textContent = "無料ｷﾞﾌﾄ";
    freeGiftTextElm.style.color = "white";
    freeGiftTextElm.style.cursor = "pointer";
    freeGiftElm.append(freeGiftTextElm);

    let myMainParent = document.getElementsByClassName("st-header__item")[0].parentNode;
    myMainParent.insertBefore(countElm, myMainParent.firstElementChild);
    myMainParent.insertBefore(freeGiftElm, myMainParent.firstElementChild);

    const method = "POST";
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    document.getElementById('count-start').addEventListener('click', () => {
        (async () => {
            let countTextElm = document.getElementById('count-text')
            document.getElementById('count-start').style.pointerEvents = "none"
            console.log('カウント開始')
            for (let i = 0; i <= 50; i++) {
                console.log(i)
                countTextElm.textContent = i
                const obj = {
                    live_id: liveId,
                    comment: i,
                    recommend_comment_id: "",
                    comment_type: "",
                    is_delay: 0,
                    csrf_token: csrfToken
                }
                const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&");
                await fetch("https://www.showroom-live.com/api/live/post_live_comment", { method, headers, body })
                await waitTime(2000);
            }
            console.log('カウント終了')
            document.getElementById('count-start').style.display = "none"
        })();
    });

    document.getElementById('throw-free').addEventListener('click', () => {
        (async () => {
            let giftTextElm = document.getElementById('throw-free-text')
            giftTextElm.textContent = "星投げ中"
            document.getElementById('throw-free').style.pointerEvents = "none"
            console.log('無料ギフト投げ開始')
            // 横一列1回
            for (let i = 0; i < 5; i++) {
                let remaining = Number(document.getElementsByClassName("gift")[i].getElementsByClassName('num')[0].textContent.replace('\n    × ', '').replace('\n  ', ''))
                let giftId = document.getElementsByClassName("gift")[i].getElementsByTagName('img')[0].src.replace('https://image.showroom-cdn.com/showroom-prod/assets/img/gift/', '').split('_')[0]
                let obj = {
                    gift_id: giftId,
                    live_id: liveId,
                    num: 10,
                    is_delay: 0,
                    csrf_token: csrfToken
                }
                if (remaining < 10) {
                    obj.num = remaining % 10
                }
                const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&")
                await fetch("https://www.showroom-live.com/api/live/gifting_free", { method, headers, body })
                await waitTime(600);
            }
            await waitTime(1000);
            // 縦に全部
            for (let i = 0; i < 5; i++) {
                let remaining = Number(document.getElementsByClassName("gift")[i].getElementsByClassName('num')[0].textContent.replace('\n    × ', '').replace('\n  ', ''))
                let giftId = document.getElementsByClassName("gift")[i].getElementsByTagName('img')[0].src.replace('https://image.showroom-cdn.com/showroom-prod/assets/img/gift/', '').split('_')[0]
                while (remaining != 0) {
                    let obj = {
                        gift_id: giftId,
                        live_id: liveId,
                        num: 10,
                        is_delay: 0,
                        csrf_token: csrfToken
                    }
                    if (remaining % 10 != 0) {
                        obj.num = remaining % 10
                        remaining -= remaining % 10
                    } else {
                        remaining -= 10
                    }
                    const body = Object.keys(obj).map((key) => key + "=" + encodeURIComponent(obj[key])).join("&")
                    await fetch("https://www.showroom-live.com/api/live/gifting_free", { method, headers, body })
                    await waitTime(600);
                }
            }
            giftTextElm.textContent = "無料ｷﾞﾌﾄ"
            document.getElementById('throw-free').style.pointerEvents = ""
            console.log('無料ギフト投げ終了')
        })();
    });
})();*/

function waitTime(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}

async function gift(id) {
const response = await axios.get(`https://www.showroom-live.com/api/live/gift_list?room_id=${id}`);
const toa = await axios.get(`https://www.showroom-live.com/api/live/gift_log?room_id=${id}`)
//let response = {data:{"enquete":[{"icon":0,"is_hidden":false,"order_no":10001,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10001_s.png?v=1","gift_id":10001,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"1","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10002,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10002_s.png?v=1","gift_id":10002,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"2","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10003,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10003_s.png?v=1","gift_id":10003,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"3","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10004,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10004_s.png?v=1","gift_id":10004,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"4","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10005,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10005_s.png?v=1","gift_id":10005,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"5","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10006,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10006_s.png?v=1","gift_id":10006,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"6","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10007,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10007_s.png?v=1","gift_id":10007,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"7","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10008,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10008_s.png?v=1","gift_id":10008,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"8","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10009,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10009_s.png?v=1","gift_id":10009,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"9","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10010,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10010_s.png?v=1","gift_id":10010,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"10","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10011,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10011_s.png?v=1","gift_id":10011,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"11","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10012,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10012_s.png?v=1","gift_id":10012,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"12","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10013,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10013_s.png?v=1","gift_id":10013,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"13","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10014,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10014_s.png?v=1","gift_id":10014,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"14","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10015,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10015_s.png?v=1","gift_id":10015,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"15","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10016,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10016_s.png?v=1","gift_id":10016,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"16","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10017,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10017_s.png?v=1","gift_id":10017,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"17","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10018,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10018_s.png?v=1","gift_id":10018,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"18","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10019,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10019_s.png?v=1","gift_id":10019,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"19","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10020,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10020_s.png?v=1","gift_id":10020,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"20","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10021,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10021_s.png?v=1","gift_id":10021,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"21","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10022,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10022_s.png?v=1","gift_id":10022,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"22","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10023,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10023_s.png?v=1","gift_id":10023,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"23","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10024,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10024_s.png?v=1","gift_id":10024,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"24","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10025,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/10025_s.png?v=1","gift_id":10025,"image2":"","free":true,"point":0,"is_delete_from_stage":true,"gift_name":"25","scale":100,"label":0,"dialog_id":0}],"normal":[{"icon":0,"is_hidden":false,"order_no":1000,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/1_s.png?v=1","gift_id":1,"image2":"","free":true,"point":1,"is_delete_from_stage":true,"gift_name":"starA","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":1001,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/1001_s.png?v=1","gift_id":1001,"image2":"","free":true,"point":1,"is_delete_from_stage":true,"gift_name":"starC","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":1002,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/1002_s.png?v=1","gift_id":1002,"image2":"","free":true,"point":1,"is_delete_from_stage":true,"gift_name":"starD","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":1003,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/1003_s.png?v=1","gift_id":1003,"image2":"","free":true,"point":1,"is_delete_from_stage":true,"gift_name":"starE","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":1004,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/2_s.png?v=1","gift_id":2,"image2":"","free":true,"point":1,"is_delete_from_stage":true,"gift_name":"starB","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2020,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/32_s.png?v=1","gift_id":32,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"good game","scale":90,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2100,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/4_s.png?v=1","gift_id":4,"image2":"","free":false,"point":1,"is_delete_from_stage":true,"gift_name":"daruma","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2101,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/1101_s.png?v=1","gift_id":1101,"image2":"","free":false,"point":3,"is_delete_from_stage":true,"gift_name":"new_daruma_A","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2103,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/1102_s.png?v=1","gift_id":1102,"image2":"","free":false,"point":3,"is_delete_from_stage":true,"gift_name":"new_daruma_C","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2104,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/1103_s.png?v=1","gift_id":1103,"image2":"","free":false,"point":3,"is_delete_from_stage":true,"gift_name":"new_daruma_D","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":2105,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/1104_s.png?v=1","gift_id":1104,"image2":"","free":false,"point":3,"is_delete_from_stage":true,"gift_name":"new_daruma_E","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":3000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3_s.png?v=1","gift_id":3,"image2":"","free":false,"point":1,"is_delete_from_stage":true,"gift_name":"heart","scale":70,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":3000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800004_s.png?v=1","gift_id":800004,"image2":"","free":false,"point":2,"is_delete_from_stage":true,"gift_name":"heart animation","scale":100,"label":0,"dialog_id":4},{"icon":0,"is_hidden":false,"order_no":5000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/5_m.png?v=1","gift_id":5,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"flower","scale":120,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":6000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/6_s.png?v=1","gift_id":6,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"koban","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":7000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/7_s.png?v=1","gift_id":7,"image2":"","free":false,"point":50,"is_delete_from_stage":true,"gift_name":"Bouquet","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":8000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/8_s.png?v=1","gift_id":8,"image2":"https://static.showroom-live.com/image/gift/8_2_s.png?v=1","free":false,"point":50,"is_delete_from_stage":true,"gift_name":"WrappingCloth","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":8004,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/12_m.png?v=1","gift_id":12,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"octopus","scale":150,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":8005,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/13_m.png?v=1","gift_id":13,"image2":"https://static.showroom-live.com/image/gift/13_2_m.png?v=1","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"ice-cream","scale":150,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":8010,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800044_m.png?v=1","gift_id":800044,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Loveletter","scale":120,"label":0,"dialog_id":44},{"icon":1,"is_hidden":false,"order_no":8020,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800087_m.png?v=1","gift_id":800087,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Get Married (anime)","scale":150,"label":0,"dialog_id":118},{"icon":0,"is_hidden":false,"order_no":9000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/9_m.png?v=1","gift_id":9,"image2":"","free":false,"point":1000,"is_delete_from_stage":true,"gift_name":"Bear","scale":170,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":10101,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800005_s.png?v=1","gift_id":800005,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"pretty animation","scale":100,"label":0,"dialog_id":5},{"icon":1,"is_hidden":false,"order_no":10106,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800006_s.png?v=1","gift_id":800006,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Cool animation","scale":100,"label":0,"dialog_id":6},{"icon":0,"is_hidden":false,"order_no":10199,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/35_m.png?v=1","gift_id":35,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"good!","scale":130,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10200,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/36_m.png?v=1","gift_id":36,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"toutoi","scale":130,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10300,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/37_m.png?v=1","gift_id":37,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"like","scale":130,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10400,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/27_m.png?v=1","gift_id":27,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Looks_good","scale":120,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10500,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/24_m.png?v=1","gift_id":24,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Thank you","scale":120,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10600,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/25_m.png?v=1","gift_id":25,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Good job","scale":120,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10700,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/26_m.png?v=1","gift_id":26,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Fight","scale":120,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10800,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/19_m.png?v=1","gift_id":19,"image2":"","free":false,"point":500,"is_delete_from_stage":true,"gift_name":"bravo","scale":200,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10900,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/28_m.png?v=1","gift_id":28,"image2":"","free":false,"point":1000,"is_delete_from_stage":true,"gift_name":"really_kawaii","scale":210,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":11000,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/38_m.png?v=1","gift_id":38,"image2":"","free":false,"point":1000,"is_delete_from_stage":true,"gift_name":"Good job","scale":180,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":11100,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/20_m.png?v=1","gift_id":20,"image2":"","free":false,"point":3000,"is_delete_from_stage":true,"gift_name":"saikou","scale":240,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":9999995,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/21_m.png?v=1","gift_id":21,"image2":"","free":false,"point":10000,"is_delete_from_stage":false,"gift_name":"SHOWROOM Tower","scale":320,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":9999999,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/23_m.png?v=1","gift_id":23,"image2":"","free":false,"point":10000,"is_delete_from_stage":false,"gift_name":"Japanese castle","scale":300,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10000001,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/31_s.png?v=1","gift_id":31,"image2":"","free":false,"point":1,"is_delete_from_stage":true,"gift_name":"Life heart","scale":80,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10000002,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/33_m.png?v=1","gift_id":33,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Medicine","scale":130,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":10000003,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/34_m.png?v=1","gift_id":34,"image2":"","free":false,"point":1000,"is_delete_from_stage":true,"gift_name":"Dot bear","scale":170,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":10000101,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800007_m.png?v=1","gift_id":800007,"image2":"https://static.showroom-live.com/image/gift/800007_2_m.png?v=1","free":false,"point":2,"is_delete_from_stage":true,"gift_name":"melody animation","scale":180,"label":0,"dialog_id":7},{"icon":1,"is_hidden":false,"order_no":10000151,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800008_s.png?v=1","gift_id":800008,"image2":"","free":false,"point":50,"is_delete_from_stage":true,"gift_name":"hand clap","scale":100,"label":0,"dialog_id":2},{"icon":0,"is_hidden":false,"order_no":10000152,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/18_m.png?v=1","gift_id":18,"image2":"","free":false,"point":88,"is_delete_from_stage":true,"gift_name":"clap","scale":220,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":10000200,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800003_m.png?v=1","gift_id":800003,"image2":"","free":false,"point":500,"is_delete_from_stage":true,"gift_name":"mirror ball","scale":150,"label":0,"dialog_id":3},{"icon":1,"is_hidden":false,"order_no":10000201,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800111_s.png?v=1","gift_id":800111,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(red)","scale":90,"label":0,"dialog_id":106},{"icon":1,"is_hidden":false,"order_no":10000202,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800112_s.png?v=1","gift_id":800112,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(blue)","scale":90,"label":0,"dialog_id":109},{"icon":1,"is_hidden":false,"order_no":10000203,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800113_s.png?v=1","gift_id":800113,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(yellow)","scale":90,"label":0,"dialog_id":107},{"icon":1,"is_hidden":false,"order_no":10000204,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800114_s.png?v=1","gift_id":800114,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(purple)","scale":90,"label":0,"dialog_id":110},{"icon":1,"is_hidden":false,"order_no":10000205,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800115_s.png?v=1","gift_id":800115,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(pink)","scale":90,"label":0,"dialog_id":103},{"icon":1,"is_hidden":false,"order_no":10000206,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800116_s.png?v=1","gift_id":800116,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(lightblue)","scale":90,"label":0,"dialog_id":108},{"icon":1,"is_hidden":false,"order_no":10000207,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800117_s.png?v=1","gift_id":800117,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(orange)","scale":90,"label":0,"dialog_id":101},{"icon":1,"is_hidden":false,"order_no":10000208,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800118_s.png?v=1","gift_id":800118,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(lightgreen)","scale":90,"label":0,"dialog_id":102},{"icon":1,"is_hidden":false,"order_no":10000209,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/800119_s.png?v=1","gift_id":800119,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(white)","scale":90,"label":0,"dialog_id":104},{"icon":1,"is_hidden":false,"order_no":29990000,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/820002_s.png?v=1","gift_id":820002,"image2":"","free":true,"point":10,"is_delete_from_stage":true,"gift_name":"Penlight(rainbow)","scale":90,"label":0,"dialog_id":105},{"icon":1,"is_hidden":false,"order_no":30000000,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/1601_s.png?v=1","gift_id":1601,"image2":"","free":true,"point":100,"is_delete_from_stage":true,"gift_name":"RainbowStar","scale":100,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":40000307,"gift_type":2,"image":"https://static.showroom-live.com/image/gift/3000307_s.png?v=1","gift_id":3000307,"image2":"","free":true,"point":10,"is_delete_from_stage":true,"gift_name":"Taiyakichan(free)","scale":80,"label":0,"dialog_id":0},{"icon":1,"is_hidden":false,"order_no":40000308,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000308_s.png?v=1","gift_id":3000308,"image2":"","free":false,"point":10,"is_delete_from_stage":true,"gift_name":"Bounce! Taiyakichan(anime)","scale":80,"label":0,"dialog_id":388},{"icon":1,"is_hidden":false,"order_no":40000309,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000309_m.png?v=1","gift_id":3000309,"image2":"","free":false,"point":100,"is_delete_from_stage":true,"gift_name":"Flower Bear Rakugan(anime)","scale":130,"label":0,"dialog_id":389},{"icon":1,"is_hidden":false,"order_no":40000310,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000310_m.png?v=1","gift_id":3000310,"image2":"","free":false,"point":500,"is_delete_from_stage":true,"gift_name":"Mizuyoukan Penguin(anime)","scale":150,"label":0,"dialog_id":390},{"icon":1,"is_hidden":false,"order_no":40000311,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000311_m.png?v=1","gift_id":3000311,"image2":"","free":false,"point":1000,"is_delete_from_stage":true,"gift_name":"Sweet Manjuu(anime)","scale":180,"label":0,"dialog_id":391},{"icon":0,"is_hidden":false,"order_no":40000312,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000312_m.png?v=1","gift_id":3000312,"image2":"","free":false,"point":10000,"is_delete_from_stage":false,"gift_name":"Matcha Bath Panda","scale":320,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":40000313,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/2420_m.png?v=1","gift_id":2420,"image2":"","free":false,"point":10000,"is_delete_from_stage":false,"gift_name":"Fruit cream Kuma Mitsu","scale":320,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":40000319,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000319_s.png?v=1","gift_id":3000319,"image2":"","free":false,"point":50,"is_delete_from_stage":true,"gift_name":"Peony","scale":90,"label":0,"dialog_id":0},{"icon":0,"is_hidden":false,"order_no":40000320,"gift_type":1,"image":"https://static.showroom-live.com/image/gift/3000320_m.png?v=1","gift_id":3000320,"image2":"","free":false,"point":500,"is_delete_from_stage":true,"gift_name":"Bouquet of peony","scale":150,"label":0,"dialog_id":0}]}}
await waitTime(3000)
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
let kon = hitungHargaGold(tol)
console.log(kon + `| ${tol}G `);
}


let id = "432364"
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




cron.schedule('*/15 * * * * *', async function () {
gift(id)
})
