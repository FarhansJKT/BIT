const Twit = require('twit');
const T = new Twit({
  consumer_key: "ZMUS9MyNSzITd68x0pm1Vfzvz",
  consumer_secret: "dcRlWpwuM12XlkiPau6CnbPESmD0fDtyQxDLdmfC2ospOkJFwL",
  access_token: "1622627422842806273-xvgiG45qdeX54YuydMXQsaD3biULzr",
  access_token_secret: "fCbLA2lgxUYxrZBgcsleUY4xSitR9tvpQY7lQ3aHZ4l2Y"
});
async function startst(tweet) {
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
            console.log(texts)
	    console.log(pp_sr)
        } else { console.log(texts) }
}

const twitterUsername = 'JKT48LiveX';
    var stream = T.stream('statuses/filter', { track: '@JKT48LiveX' });
    stream.on('tweet', (tweet) => {
       return startst(tweet);
    });


