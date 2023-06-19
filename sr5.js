const axios = require('axios');
const { serialize, getBuffer, fetchJson, sleep } = require("./lib/myfunc");
/*async function getCommentCount(roomId) {
  try {
    const response = await axios.get(`https://api.showroom.com/api/rooms/${roomId}`);
    const commentCount = response.data.room.commentCount;
    return commentCount;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

console.log(getCommentCount(332503))
*/

const key = ""
async function getCsrf() {
let res = await axios.get("https://www.showroom-live.com/api/csrf_token");
let token = res.data.csrf_token
return token
}

const method = "POST";
const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
};

let created = []

let csrf = getCsrf()
async function getkom() {
let id = "303895"
let statuses = await axios.get(`https://www.showroom-live.com/api/live/comment_log?room_id=${id}`);
for (let kom of statuses.data.comment_log) {
    let kret = kom.created_at
    if (!created.includes(kret)) {
     console.log(created.length)
     created.push(kret);
    }
}
await sleep(1000);
await getkom()
}

async function loging() {
await getkom()
await sleep(3000);
console.log(created.length)
}

getkom()
