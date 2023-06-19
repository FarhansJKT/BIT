const { TwitterApi } = require('twitter-api-v2');
const client = new TwitterApi({
  appKey: "ZMUS9MyNSzITd68x0pm1Vfzvz",
  appSecret: 'dcRlWpwuM12XlkiPau6CnbPESmD0fDtyQxDLdmfC2ospOkJFwL',
  bearerToken: 'AAAAAAAAAAAAAAAAAAAAAMhQnwEAAAAAus5anNZX05%2BF0o7R3eKXZ6hTuzY%3DLdyH1OMn8KmsH7iMINtkhPdpHggnrdDx4R1HhRfMYeWCKFSTpy'
});
const moment = require('moment-timezone');

const jakartaTime = moment().tz('Asia/Jakarta');
const jakartaDateTime = jakartaTime.format('YYYY-MM-DD HH:mm:ss');
const username = 'JKT48LiveX';

(async () => {
  try {
    const { data: tweets } = await client.v2.userByUsername(username);

    if (tweets.length > 0) {
      const latestTweet = tweets[0];

      const tweetDateTime = moment(latestTweet.created_at).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
      
      if (tweetDateTime === jakartaDateTime) {
        console.log('Latest tweet:');
        console.log('Text:', latestTweet.text);
        console.log('URL:', `https://twitter.com/${username}/status/${latestTweet.id}`);

        if (latestTweet.attachments && latestTweet.attachments.media_keys) {
          const mediaUrl = latestTweet.attachments.media_keys
            .map((mediaKey) => latestTweet.includes.media.find((media) => media.media_key === mediaKey).url)
            .join('\n');
          console.log('Media URL:', mediaUrl);
        }
      } else {
        console.log('No tweet with matching date and time found.');
      }
    } else {
      console.log('No tweets found for the specified username.');
    }
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
})();

