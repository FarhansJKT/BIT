const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.jkt48.com/live/idn';

let previousLive = null;

const checkJKT48Live = async () => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const liveItem = $('.live-item').first();
      const linkApp = liveItem.find('.live-app-link').attr('href');
      const linkWeb = liveItem.find('.live-web-link').attr('href');
      const title = liveItem.find('.live-title').text();
      const thumbnailUrl = liveItem.find('.live-thumb img').attr('src');

      if (!previousLive) {
        previousLive = linkApp;
      }

      if (linkApp !== previousLive) {
        console.log('JKT48 iDN Live is starting now!');
        console.log('Title:', title);
        console.log('App Link:', linkApp);
        console.log('Web Link:', linkWeb);
        console.log('Thumbnail URL:', thumbnailUrl);

        previousLive = linkApp;
      }
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }
};

// Cek JKT48 Live setiap 1 menit
setInterval(checkJKT48Live, 60000);
